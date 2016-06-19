---
layout: post
title: Largest rectangle in a polygon
subtitle: An approximation algorithm for finding the largest rectangle inside a non-convex polygon
category: behind-the-scenes
author: daniel
author_url: https://twitter.com/dsmilkov
tags:
  - algorithm
  - geometry
---
Note: There is an [interactive vizualization](#interactive) of the algorithm at the end of the post.

In this blog post I'm going to explain an algorithm that we recently designed for finding the largest area rectangle of any orientation that lies inside a given polygon. An important application of this problem is label placement, e.g. names inside countries or labels in stacked area charts. Also, since the algorithm can find a rectangle of arbitrary aspect ratio, it can also be used to place wrapped paragraphs inside the polygons. The algorithm will be incorporated in `d3plus.geom` in the 1.4.0 release. 

Here is an example of a polygon with the largest rectangle shown in green:

<img width="400" src="/assets/posts/largestRect/img/solution.png" />

And here is a real-world example where this algorihtm is being used for label placement in a stacked area chart:

<img width="600" src="/assets/posts/largestRect/img/stackedarea.png" />

But before diving into how this algorithm works, let's look at some prior work. When the polygon is convex, i.e. every internal angle is less than or equal to 180 degrees, this problem is relatively easy to solve, meaning that there are fast algorithms that are guaranteed to find the optimal solution [^convex-algo1]<sup>, </sup>[^convex-algo2]. When the polygon is non-convex, however, there is no polynomial time solution. There is a fast algorithm for finding an axis-aligned rectangle [^nonconvex-algo1], but the best approximation algorithm for an arbitrary orientation is $$O(n^3)$$ complexity [^nonconvex-algo2]. 

After looking at those papers, it wasn't clear to me how complicated their implementation will be and whether it will run fast in practice. So we decided to design our own approximation algorithm which takes a brute-force approach with extensive pruning. The basic steps of the algorithm are:

1. Choose an orientation $$\alpha$$ for the rectangle.
2. Choose a center point $$(x_0, y_0)$$ for the rectangle.
	* 2.1. Create two new 'corrected' centers from the given center.
3. Choose an aspect ratio $$r$$ for the rectangle.
4. Given $$\alpha$$, $$(x_0, y_0)$$ and $$r$$, find the maximum width $$w$$ (area) such that the rectangle lies inside the polygon.

Since the rectangle is not axis-aligned and can rotate, we need to agree on a convention: we will refer to the length of the longer side of the rectangle as the width, and the length of the shorter side as the height of the rectangle. An angle of rotation then means that the longer side of the rectangle will be parallel to that angle.

The user can specify an array of possible orientation angles, otherwise the algorithm will try every angle between -90 and +90 with step size of 5 degrees, i.e. -90, -85, -80, etc. Similarly, if the aspect ratio (width to height ratio) is not specified, the algorithm will try every aspect ratio between 1 and 15 with step size of 0.5, i.e. 1, 1.5, 2, etc. Note that because of the convention, the width is always greater or equal to the height, thus the aspect ratio is always greater or equal to 1. The user can also specify an array of centers from which to look for the largest rectangle, otherwise the centers are randomly chosen, making this algorithm random. A random algorithm means the results will vary between different re-runs of the algorithm. The default number of centers is 20, but the user can specify otherwise. The number of centers has a linear impact on the running time of the algorithm, so more centers means longer running time, but also improves the quality of the result.

Now that we've described the basic idea, let's dive a little deeper. At the beginning, the algorithm simplifies the polygon using a line simplification algorithm to reduce the number of points of the polygon while maintaining its shape. This pre-processing significantly speeds up the rest of the algorithm. For this particular task we used [Simplify.js](http://mourner.github.io/simplify-js/).

<img width="400" src="/assets/posts/largestRect/img/simplify.png" />

Then the centers are pre-computed by generating random points inside the bounding box of the polygon and rejecting those that don't lie inside the polygon.

<img width="500" src="/assets/posts/largestRect/img/centers.png" />

Then the rectangle search starts. An angle of orientation is chosen for the rectangle (step 1). Then each center point is processed (step 2). The current selected center is highlighted in the figure below. From the current center, two new 'corrected' centers are spawned (step 2.1) by casting two rays through the current center: the 'width ray' which is parallel to the longer side of the rectangle, and the 'height ray' which is perpendicular to the previous ray and therefore parallel to the shorter side of the rectangle. Then the two new centers (shown in orange) are obtained by taking the mid section of the two rays respectively. The idea is that these two new centers have potentially better placement than the original randomly generated center.

<img width="500" src="/assets/posts/largestRect/img/correct-center.png" />

Then the algorithm goes through both newly computed centers and, in the same way as before, casts two rays. This time however, the information from the two rays is used to detect the maximum possible width $$w_{max}$$ and height $$h_{max}$$ given the center and the orientation of the rectangle. The maximum width is chosen by taking the two intersecting points between the width ray and the polygon (shown in red in the next figure) and taking the shorter distance of the two points with the center of the rectangle, which gives us half of the width. The maximum height is computed analogously using the height ray.

<img width="500" src="/assets/posts/largestRect/img/bounds.png" />

Once $$w_{max}$$ and height $$h_{max}$$ are estimated, the algorithm iterates through the different aspect ratios $$ r$$ (step 3). The algorithm iteratively improves the solution and stores the area of the current best solution in $$A_{best}$$. Since the algorithm tries to improve on the current best solution, it shouldn't test for rectangles that have smaller area than $$A_{best}$$. Thus, given the current $$w_{max}$$ and $$h_{max}$$, not all possible aspect ratios are tested:

$$
\max \{1, \frac{A_{best}}{h_{max}^2} \} \leq r \leq \min \{15, \frac{w_{max}^2}{A_{best}} \}.
$$

Once the aspect ratio $$r$$ is chosen, the algorithm maximizes the width $$w$$ of the rectangle (step 4), such that it will lie inside the polygon. The maximization of the width is done through binary search, taking advantage of the property that if a rectangle of width $$w$$ lies inside the polygon, all other rectangles of width less than $$w$$ also lie inside the polygon. Similarly as before, not all possible widths are tested, since the area of the new potential rectangle should be greater than the current best solution: 

$$
\sqrt{A_{best} r} \leq w \leq \min \{w_{max}, h_{max} r \}.
$$

<a name="interactive"></a>

Finally, if the rectangle with the current width $$w$$ lies inside the polygon, the algorithm updates $$A_{best}$$ and stores the solution.

Interactive visualization
----------------------------

<strong>Country: </strong>
<a href="javascript:void(0);" class="playback" id="prev-country">Prev</a> | <select id="select-country"></select> | <a href="javascript:void(0);" class="playback" id="next-country">Next</a>
<br/>
<strong>Playback: </strong><a href="javascript:void(0);" id="play">Play</a> | <a href="javascript:void(0);" class="playback" id="restart">Restart</a> | <a href="javascript:void(0);" id="next-step">Next step</a>
<br/>
<strong>Animation: </strong> Fast <input id="slider" type="range" min="1" max="10" step="0.1" value="2"/> Slow
<hr/>
<svg id="svg" name="svg"></svg>



[^convex-algo1]: C. Knauer et al. Largest inscribed rectangles in convex polygons, Proceedings of the 26th European Workshop on Computational Geometry (EuroCG’10), Dortmund, Germany, 2010.

[^convex-algo2]: H. Alt et al. Computing the largest inscribed isothetic rectangle, Proceedings of 1995 Canadian Conference on Computational Geometry (CCCG) (1995) 67–72.

[^nonconvex-algo1]: R.P. Boland et al. Finding the largest axis-aligned rectangle in a polygon in O(nlog n) time, Proc. 13th Canad. Conf. Comput. Geom, 2001, 41–44.

[^nonconvex-algo2]: R. Molano et al. Finding the largest area rectangle of arbitrary orientation in a closed contour. Applied Mathematics and Computation 218.19 (2012).
	

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script src="/assets/posts/largestRect/lib/coffee-script.js"></script>
<script src="/assets/posts/largestRect/lib/d3.min.js"></script>
<script src="/assets/posts/largestRect/lib/simplify.js"></script>
<script src="/assets/posts/largestRect/src/index.coffee" type="text/coffeescript"></script>
<script src="/assets/posts/largestRect/src/largestRect.coffee" type="text/coffeescript"></script>
<style>
.disabled {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: black;
}

.disabled:hover {
  color: black;
}
</style>