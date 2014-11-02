if (Meteor.isClient) {

  Template.event.events({
    'click #makeTeams': function() {
      // PCA for the win?

      // grab the data from the mongodb and create a 2D matrix
      var X = [];
      var curr_event = Session.get("current_event");
      var e = Events.find({ _id:curr_event }).fetch()[0];

      // ensure that there are enought people to make teams
      if (!e.participants || e.participants.length<8) {
        $("#alertBox").empty();
        $("<div>", {
          "class": "alert alert-danger alert-dismissible",
          text: "Oops! You need at least 8 people to create teams!"
        }).append('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>').appendTo("#alertBox");
        console.log("not enough people!");
        return;
      }

      for (var i=0; i<e.participants.length; i++) {
        var row = [];
        var person = e.participants[i];
        for (var attr in person['attributes']) {
          row.push(person['attributes'][attr]);
        }
        // bandaide
        while (row.length <= e.participants.length) {
          row.push.apply(row,row); // row your boat
        }
        X.push(row);
      }

      // var X = [[1, 3, 5, 4, 4, 6, 3, 6, 0],
      //          [4, 6, 9, 14, 4, 5, 5, 12, 2],
      //          [1, 0, 1, 0, 1, 0, 1, 0, 1],
      //          [4, 5, 10, 3, 2, 7, 3, 1, 10],
      //          [5, 1, 4, 4, 5, 1, 5, 9, 2],
      //          [3, 2, 12, 10, 2, 5, 0, 20, 1],
      //          [9, 10, 3, 23, 5, 1, 12, 13, 2],
      //          [4, 4, 4, 10, 3, 8, 9, 2, 5]]; // size is n by d
      var size = numeric.dim(X)
      var n = size[0]; // rows
      var d = size[1]; // columns

      // ==> Calculate the mean and center the center
      var M = []; // row vector of means
      // use the transpose for ease of calculating the means of the columns of
      // X
      var Xt = numeric.transpose(X);
      for (var i=0; i<d; i++) { // loop over all the columns
        var s = 0; // sum
        for (var k=0; k<n; k++) { // loop over each element in the column
          s += Xt[i][k];
        }
        // calculate the mean and add it the column vector
        var m = s/(d);
        M.push(m);
      }

      // ==> Calculate the eigenvalues and eigenvectors
      // center the data
      var u = numeric.rep([n],M);
      var B = numeric.sub(X,u);
      var Bt = numeric.transpose(B);
      var C = numeric.dot(Bt,B);
      // make the calculation
      var LE = numeric.eig(C);
      var eigenvalues = LE.lambda;
      var eigenvectors = LE.E;

      // ==> Principal Component Analysis
      var D = numeric.diag(eigenvalues.x);
      var eigen_hacker = numeric.dot(B,eigenvectors.x);
      // normalize the eigen_hackers
      var eigen_hackerT = numeric.transpose(eigen_hacker);
      for (var i=0; i<eigen_hackerT.length; i++) {
        var norm = numeric.norm2(eigen_hackerT[i]);
        for (var k=0; k<eigen_hackerT[i][k].length; k++)
          eigen_hackerT[i][k] = eigen_hackerT[i][k]/norm;
      }
      eigen_hacker = numeric.transpose(eigen_hackerT);

      var principal_coordinates = numeric.dot(Bt,eigen_hacker);
      // ==> Sort eigenvalues in descending order and reorder the eigenvectors
      var e = eigenvalues.x;
      // create an assciative array of the eigenvalues and eigen_hackers
      var pairs = [];
      for (var i=0; i<e.length; i++) {
        // filter out 0 eigenvalues
        if (e[i] > 0.000000001)
          pairs[e[i]] = eigen_hacker[i];
      }

      pairs.sort(function(a, b){return a<b});
      var e = [];
      var pc = [];
      for (var eigen in pairs) {
        e.push(eigen);
        pc.push(pairs[eigen]);
      }

      // ==> Examine the explained variance

      // later

      // ==> k-means clustering algorithm
      var group_size = 4;
      var num_groups = Math.ceil(n/group_size);
      // assign each point an arbitrary group number
      var points = [];
      var group_totals = [];
      for (var i=0; i<num_groups; i++) group_totals[i] = 0;
      var pcT = numeric.transpose(pc);
      for (var i=0; i<n; i++) {
        points.push({
          coords: pcT[i],
          group: i%num_groups
        });
        group_totals[i%num_groups]++;
      }


      // distance function
      // start by only using the first two PCs
      var MAX = 3;
      var dist = function(a,b){
        var s = 0;
        for (var i=0; i<MAX; i++) {
          s += Math.pow(a[i]-b[i],2);
        }
        return Math.sqrt(s);
      }


      // go go go
      var centroids = [], sums = [];
      while (true) {
        // calculate the centroid of each group
        for (var i=0; i<num_groups; i++) {
          sums[i] = 0;
          centroids[i] = [];
        }
        for (var p=0; p<points.length; p++) {
          sums[points[p].group] = numeric.add(sums[points[p].group],points[p].coords);
        }
        for (var i=0; i<sums.length; i++) {
          for (var k=0; k<sums[i].length; k++) {
            centroids[i][k] = sums[i][k]/group_totals[i];
          }
        }

        // reclassify points
        var changed = false;
        for (var p=0; p<points.length; p++) {
          // calculate the distance from the point to each centroid
          var p_group = points[p].group;
          var group_dist = dist(centroids[p_group],points[p].coords);
          // compare to the other centroids
          for (var i=0; i<num_groups; i++) {
            if (p_group == i)
              continue; // skip its own centroid
            var d = dist(centroids[i],points[p].coords);
            if (d < group_dist) {
              // change the group
              group_dist = d;
              group_totals[points[p].group]--;
              group_totals[i]++;
              points[p].group = i;
              changed = true;
            }
          }
        }
        // if no changes were made then we're done
        if (!changed)
          break;
      }

      // console.log(points);

      // ==> force each cluster to have the desired number of members
      // sort the clusters in descending order by populus
      var sorted_groups = group_totals.slice().sort().reverse() ;
      var locked_groups = [];

      for (var i=0; i<num_groups; i++) {
        if (group_totals[centroid_num] <= 4) break; // we're done;
        // find the closest centroid
        var centroid_num = group_totals.indexOf(sorted_groups[i]);
        locked_groups.push(centroid_num);
        var closest_dist = -1;
        var closest_cent = 0;
        for (var c=0; c<num_groups; c++) {
          // check if this centroid is locked (completed)
          var skip = false;
          for (var k=0; k<locked_groups.length; k++) {
            if (locked_groups[k] == c) {
              skip = true;
              break;
            }
          }
          if (skip) continue;
          // otherwise check how close it is
          var d = dist(centroids[centroid_num],centroids[c]);
          if (closest_dist == -1 || d < closest_dist)
            closest_dist = d;
            closest_cent = c;
        }
        // move points out of this cluster to the closest cluster until only 4
        // remain
        while (group_totals[centroid_num] > 4) {
          var closest_dist = -1;
          var closest_node = 0;
          for (var p=0; p<points.length; p++) {
            // only move the points in the cluster we're currently looking at
            if (points[p].group == centroid_num) {
              var d = dist(points[p].coords, centroids[closest_cent]);
              if (closest_dist == -1 || d < closest_dist) {
                closest_dist = d;
                closest_node = p;
              }
            }
          }
          // move the closest point
          group_totals[centroid_num]--;
          points[closest_node].group = closest_cent;
          group_totals[closest_cent]++;
        }
      }

      console.log(points);

      // ==> Ready to plot the first the principal components and clusters!
      Events.update({ _id:curr_event }, {
        $set: { data: points }
      });

    }
  });

}
