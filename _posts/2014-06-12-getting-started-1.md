---
layout: post  
title: Getting Started with D3plus part 1&#58; The Basics
subtitle: Learning the basics of D3plus with US crime data
category: getting-started
author: alex
author_url: https://twitter.com/ximoes
tags:  
  - tree map
  - data visualization
---

The following blog post will walk you through how to get up and running with the absolute basics of creating a D3plus visualization. We will start by looking at how and where to download the library, formatting data and lastly creating a tree map from scratch.

When developing locally, note that your browser may enforce strict permissions for reading files out of the local file system. If you use d3.xhr locally (including d3.json et al.), you must have a local web server. For example, you can run Python's built-in server:

{% highlight python %}
python -m SimpleHTTPServer 8888 &
{% endhighlight %}

<h2>Getting the Data</h2>
For this getting-started walkthrough we'll be using data from the <a href="http://www.ucrdatatool.gov/ranking.cfm">Uniform Crime Reports</a> collected by the FBI. The tab delimited file (TSV) we will be using is a collection of crime data from US states over the past 50 years. So the 3 dimensions of our dataset are the following: YEAR, STATE, CRIME. A sample of the first few rows looks like the following.

<aside>
  US crime data by state (1960 - 2012).
  <p><a href="/assets/posts/getting_started_1/data/state_crime.tsv">state_crime.tsv</a>
  </p>
</aside>
{% highlight text linenos=table %}
Alabama	1960	4512	2853.0	19344	281	27.5	11626	406	33823	3266740
Alabama	1961	4255	2535.0	18801	252	19.1	11205	427	32541	3302000
Alabama	1962	3995	2801.0	21306	218	22.5	11722	316	35829	3358000
Alabama	1963	4755	3033.0	22874	192	24.7	12614	340	38521	3347000
Alabama	1964	5555	3679.0	26713	397	29.1	15898	316	46290	3407000
Alabama	1965	5162	3702.0	28115	367	28.7	16398	395	48215	3462000
Alabama	1966	6249	4606.0	30583	341	32.0	18551	384	53740	3517000
Alabama	1967	6495	5170.0	31682	371	33.0	20227	415	57079	3540000
Alabama	1968	6009	6086.0	34508	396	41.0	22403	421	62997	3566000
Alabama	1969	6415	6045.0	36644	494	41.0	23559	485	66248	3531000
{% endhighlight %}

<h2>Loading the Data on the Page</h2>

So we'll start with a basic template HTML page such as the following:

<aside>
  Boilerplate HTML page.
  <p><a href="/assets/posts/getting_started_1/html/step_1.html">step_1.html</a>
  </p>
</aside>
{% highlight html linenos=table %}
<!DOCTYPE html>
<meta charset="utf-8">
<style>

/* CSS goes here. */

</style>
<body>
<script src="d3.min.js"></script>
<script src="d3plus.js"></script>
<script>

/* JavaScript goes here. */

</script>
{% endhighlight %}

And with our python web server running we can visit http://localhost:8888 to view our template page.

In order to load our TSV file we can use the D3 helper method d3.tsv which is shorthand for making an XHR request to the server to fetch our data and nicely format our data into an array.

{% highlight js linenos=table %}
d3.tsv("state_crime.tsv", function(error, state_crime) {
  if (error) return console.error(error);
  console.log(state_crime);
});
{% endhighlight %}

Now if you were to open up your JavaScript console you'd see that our state_crime variable that was returned is an array of objects, each one keyed by the header column of our TSV file.

<img src="/assets/posts/getting_started_1/img/state_crime_tsv_console.png" />

<h2>Drawing the Visualization</h2>

In the callback for our XHR call to the server we will call a function <code>make_viz()</code> which we'll pass our data to. This function will instantiate a <code>d3plus.viz()</code> object with the parameters specified below.

{% highlight js linenos=table %}
d3.tsv("state_crime.tsv", function(error, state_crime) {
  if (error) return console.error(error);
  make_viz(state_crime);
});

function make_viz(data){
  var visualization = d3plus.viz()
      .container("#viz")
      .data(data)
      .type("tree_map")
      .id("State")
      .size("Assault")
      .time("Year")
      .draw()
}
{% endhighlight %}

If we run this in our browser we'll see the error message "No Data Available". I'll save you a bit of head scratching by telling you that the reason for this is that when we use D3's <code>.tsv()</code> function it returns all our data as strings whether we intended them to be or not. So when we're telling D3plus to use "Assault" as the key for sizing our tree map it expects an integer or float. Thus we'll have to coerce our "Assault" value along with all other numeric variables to numbers.

{% highlight js linenos=table %}
d3.tsv("state_crime.tsv", function(error, state_crime) {
  if (error) return console.error(error);
  
  // Coerce data values to be numeric
  state_crime.forEach(function(d) {
    d3.keys(d).forEach(function(k){
      if(k != "State"){
        d[k] = +d[k]
      }
    })
  });
  
  make_viz(state_crime);
});
{% endhighlight %}

<aside>
  Tree map of state crime data.
  <p><a href="/assets/posts/getting_started_1/html/step_2.html">step_2.html</a>
  </p>
</aside>

<iframe src="/assets/posts/getting_started_1/html/step_2.html" width="790px" height="400px" scrolling="no" frameBorder="0"></iframe>

<h2>Massaging the Data</h2>
In the example above we may notice that "United States-Total" is included in our dataset and skews our tree map by occupying 50% of the available space. It would make sense for us to remove this seeing as the total size of our tree map technicall represents the US total. We could filter this out with the following code:

{% highlight js linenos=table %}
d3.tsv("/assets/posts/getting_started_1/data/state_crime.tsv", function(error, state_crime) {
  if (error) return console.error(error);
  
  // Coerce data values to be numeric
  state_crime.forEach(function(d) {
    d3.keys(d).forEach(function(k){
      if(k != "State"){
        d[k] = +d[k]
      }
    })
  });
  
  // Filter out US total values
  state_crime = state_crime.filter(function(d){
    return d.State != "United States-Total"
  })
  
  make_viz(state_crime);
});
{% endhighlight %}

<aside>
  Tree map of state crime data with US totals removed.
  <p><a href="/assets/posts/getting_started_1/html/step_3.html">step_3.html</a>
  </p>
</aside>
<iframe src="/assets/posts/getting_started_1/html/step_3.html" width="790px" height="400px" scrolling="no"></iframe>

So now your next complaint (as any great statistician's would be) is that we are showing crime totals without taking into account the difference in population for each state. Luckily we have population in our dataset and can easily normalize by this value, we just need to tweak our callback slightly. In the same function where we coerce to numeric values, we can also divide by the population.

{% highlight js linenos=table %}
// Coerce data values to be numeric and
// Divide values by population to get crime "rate"
state_crime.forEach(function(d) {
  d3.keys(d).forEach(function(k){
    if(k != "State"){
      d[k] = +d[k] 
    }
    if(k != "State" && k != "Population" && k != "Year"){
      d[k] = d[k] / d['Population']
    }
  })
});
{% endhighlight %}

<aside>
  Tree map of state crime data normalized by state populations.
  <p><a href="/assets/posts/getting_started_1/html/step_4.html">step_4.html</a>
  </p>
</aside>
<iframe src="/assets/posts/getting_started_1/html/step_4.html" width="790px" height="400px" scrolling="no"></iframe>

<h2>Time Waits for No One</h2>
Our visualization seems to be nearing completion here, there is just one dimension of our data that we have neglected thus far -- the year! Since having data separated along a yearly dimension is such a common task for visualizations, D3plus makes it easy to add in a timeline. We'll use the <a href="https://github.com/alexandersimoes/d3plus/wiki/Time-Parameters"><code>.time()</code></a> method and pass the string of the key that holds our year variable.

{% highlight js linenos=table %}
function make_viz3(data){
  var visualization = d3plus.viz()
      .container("#step_4")
      .data(data)
      .type("tree_map")
      .id("State")
      .size("Assault")
      .time("Year")
      .draw()
}
{% endhighlight %}

By default, this will draw our visualization with every year's data value (in our case assaults) aggregated but if we specify a "solo" parameter for our time method we initialize the visualization to a specific year's data. Let's use the most recent year, 2012.

{% highlight js linenos=table %}
function make_viz3(data){
  var visualization = d3plus.viz()
      .container("#step_4")
      .data(data)
      .type("tree_map")
      .id("State")
      .size("Assault")
      .time({
        "value": "Year",
        "solo": 2012
      })
      .draw()
}
{% endhighlight %}

<aside>
  Tree map of state crime data using a timeline.
  <p><a href="/assets/posts/getting_started_1/html/step_5.html">step_5.html</a>
  </p>
</aside>
<iframe src="/assets/posts/getting_started_1/html/step_5.html" width="790px" height="400px" scrolling="no"></iframe>

<h2>Wrap Up</h2>
In conclusion here, we've looked at how to go from a raw dataset in a tab delimited text file to a working visualization using D3plus. In the real world many datasets are messy and may take cleaning to get them in a format that is useable by D3plus or any other visualization library. We touched on a few techniques in this tutorial, from coercing variables into numbers to filtering out specific keys. Hopefully this getting started write-up will inspire you to begin creating your own visualization and we urge you to <a href="https://groups.google.com/forum/#!forum/d3plus">communicate with the community</a> if there are any feature requests or problems you run into along the way. Happy coding!