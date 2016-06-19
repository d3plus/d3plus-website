# TESTING
delay = null
runningIdx = -1

d3.json "/assets/posts/largestRect/data/countryCoordinates.json", (error, data) ->
  console.warn(error) if error
  
  # console.time 'time'
  # areaRatios = []
  # for key, poly of data
  #   poly = d3.geom.polygon poly
  #   [rect, area, events] = largestRect poly
  #   if rect? then areaRatios.push (area / poly.area())
  # console.log areaRatios.length, '/', Object.keys(data).length
  # console.timeEnd 'time'
  # areaRatios.sort()
  # console.log '1% quantile', d3.quantile(areaRatios, 0.01)
  # console.log '5% quantile', d3.quantile(areaRatios, 0.05)
  # console.log '95% quantile', d3.quantile(areaRatios, 0.95)


  # initalize the slider
  delayScale = d3.scale.pow().exponent(4).domain([1, 10]).range([1,500])
  d3.select("#slider").on 'input', () ->
    delay = delayScale(this.value)
  delay = delayScale d3.select("#slider").node().value

  dd = Object.keys(data)
  dd.sort()
  select  = d3.select("#select-country")
  options = select.selectAll('option').data(dd)
    .enter()
    .append("option")
    .text (d) -> d

  changeCountry = (index) ->
    d3.select('#play').classed 'disabled', false
    d3.select('#next-step').classed 'disabled', false
    d3.select('#restart').classed 'disabled', true
    if not index? then index = select.property 'selectedIndex'
    inc = 1
    if this isnt window
      id = d3.select(this).attr('id')
      if id is 'prev-country' then inc = -1
      else if id is 'restart'
        d3.select('#restart').classed 'disabled', true
        inc = 0
      index = (index+inc) % dd.length
      if index < 0 then index += dd.length
    try  event = new Event "change"
    catch e 
     event =  document.createEvent "Event"
     event.initEvent "change", true, false
    select.property 'selectedIndex', index
    select.node().dispatchEvent(event)

  d3.selectAll("a.playback").on 'click', changeCountry
  select.on "change", () ->
      selectedIndex = select.property 'selectedIndex'
      key = dd[selectedIndex]
      poly = data[key]
      # options = {aspectRatio:4}
      # options = {angle:70}
      options = {vdebug:true}
      [rect, area, events] = largestRect poly, options
      drawEvents poly, rect, events
  changeCountry 36

# PLOTTING
drawEvents = (poly, rect, events) ->
  console.log '# of events', events.length
  # determine the size of the svg
  width = 500
  height = width
  xExtent = d3.extent poly, (d) -> d[0]
  yExtent = d3.extent poly, (d) -> d[1]
  widthBox = xExtent[1] - xExtent[0]
  heightBox = yExtent[1] - yExtent[0]
  ratio = widthBox / heightBox
  if widthBox > heightBox then height = width/ratio
  else width = height*ratio
  
  # define svg scales
  scaleX = d3.scale.linear()
    .domain xExtent
    .range [0, width]

  scaleY = d3.scale.linear()
    .domain yExtent
    .range [height, 0]


  padding = 10
  svg = d3.select("#svg")
  svg.selectAll("*").remove()
  svg
    .attr("width", width + padding + 200)
    .attr("height", height + padding)

  # plot the initial polygon
  pointsStr = poly.map((d) -> scaleX(d[0]) + ',' + scaleY(d[1])).join(' ')
  svgPolygon = svg.append("polygon")
      .attr "points", pointsStr
      .attr "stroke", "black"
      .attr "fill", 'transparent'
  eventIdx = -1

  d3.select('#next-step').on 'click', () ->
    d3.select('#play').classed 'disabled', false
    d3.select('#restart').classed 'disabled', false
    handleEvent(++runningIdx, true)
  d3.select('#play').on 'click', () ->
    d3.select(this).classed 'disabled', true
    d3.select('#restart').classed 'disabled', false
    handleEvent(++runningIdx)
  yPadding = 20
  
  # Legend showing the current state of the algorithm
  svg.append("text")
    .text 'Angle:'
    .attr 'x', width+10
    .attr 'y', yPadding+15
    .attr 'fill', 'black'

  angleRectCX = width + 60 + 40/2
  angleRectCY = yPadding + 15/2

  angleRect = svg.append("rect")
    .attr "x", width+60
    .attr "y", yPadding
    .attr "width", 40
    .attr "height", 15
    .attr "transform", "rotate(" + -90 + ", " + angleRectCX + ", " + angleRectCY + ")"
    .attr 'id', 'angleRect'
    .attr "stroke-width", 1
    .attr 'stroke', 'black'
    .attr 'fill', 'white'
  
  svg.append("text")
    .text 'Aspect ratio:'
    .attr 'x', width + 10
    .attr 'y', yPadding + 65
    .attr 'fill', 'black'
 
  area = 400
  ratio = 1
  aRatioRect = svg.append("rect")
    .attr "x", width + 90
    .attr "y", yPadding + 50
    .attr "width", Math.sqrt area*ratio
    .attr "height", Math.sqrt area/ratio
    .attr 'id', 'aRatioRect'
    .attr "stroke-width", 1
    .attr 'stroke', 'black'
    .attr "fill", 'transparent'

  maxAreaText = svg.append("text")
    .attr 'id', 'maxarea'
    .attr 'x', width + 10
    .attr 'y', yPadding + 115
    .attr 'fill', 'black'
  maxAreaText.append("tspan").text('A')
  maxAreaText.append("tspan").attr('baseline-shift', 'sub').text('best')
  maxAreaText.append("tspan").text(' / A')
  maxAreaText.append("tspan").attr('baseline-shift', 'sub').text('poly')
  maxAreaText.append("tspan").text ' : '
  maxAreaText = maxAreaText.append("tspan").text 'No solution yet'

  svg.append("text")
    .attr 'id', 'progress'
    .attr 'x', width + 10
    .attr 'y', yPadding + 165
    .attr 'fill', 'black'
    .text 'Progress:'


  svg.append("rect")
    .attr "x", width + 90
    .attr "y", yPadding + 155
    .attr "width", 100
    .attr "height", 5
    .attr "stroke-width", 1
    .attr 'stroke', 'black'
    .attr "fill", 'transparent'

  progressRect = svg.append("rect")
    .attr "x", width + 90
    .attr "y", yPadding + 155
    .attr "width", 0
    .attr "height", 5
    .attr 'id', 'aRatioRect'
    .attr "fill", '#b35c1e'

  eventPolygon = (vevent) ->
    # gray out the original polygon
    svg.select("polygon").attr 'opacity', 0.4

    pointsStr = vevent.poly.map((d) -> scaleX(d[0]) + ',' + scaleY(d[1])).join(' ')
    svgPolygon = svg.append("polygon")
      .attr "points", pointsStr
      .attr "stroke", "black"
      .attr "fill", 'transparent'

  eventOrigins = (vevent) ->
    # draw the random origin points
    origins = svg.selectAll("circle")
      .data(vevent.points)
      .enter()
      .append("circle")
      .attr 'class', 'origin'
      .attr 'id', (d, i) -> 'origin-' + i
      .attr "cx", (d) -> scaleX d[0]
      .attr "cy", (d) -> scaleY d[1]
      .attr "r", 3
      .attr 'fill', 'black'

  eventOrigin = (vevent) ->
    svg.select("#rect-center").remove()
    svg.append("circle")
      .attr 'cx', scaleX(vevent.cx)
      .attr 'cy', scaleY(vevent.cy)
      .attr 'r', 6
      .attr 'id', 'rect-center'
      .attr 'fill', '#b35c1e'


  eventRectangle = (vevent) ->
    # clean-up
    svg.select("#attempt").remove()
    if vevent.insidePoly then svg.select("#solution").remove()

    x = vevent.cx - vevent.width/2
    y = vevent.cy + vevent.height/2
    rect = svg.append("rect")
      .attr "x",scaleX x
      .attr "y", scaleY y
      .attr "width", Math.abs scaleX(vevent.width) - scaleX(0)
      .attr "height", Math.abs scaleY(vevent.height) - scaleY(0)
      .attr "transform", "rotate(" + vevent.angle + ", " + scaleX(vevent.cx) + ", " + scaleY(vevent.cy) + ")"
      .attr "stroke", if vevent.insidePoly then 'green' else '#b35c1e'
      .attr 'id', if vevent.insidePoly then 'solution' else 'attempt'
      .attr "stroke-width", 2
      .attr 'stroke-opacity', 1
      .attr "fill", 'transparent'
    
    if vevent.insidePoly
      maxAreaText
        .attr 'fill', '#b35c1e'
        .transition()
        .duration(3000)
        .attr 'fill', 'black'
        .text (vevent.areaFraction*100).toFixed(1) + "%"
  eventARatio = (vevent) ->
    #svg.select("#attempt").remove()
    aRatioRect
      .transition()
      .duration(50)
      .attr 'fill', '#b35c1e'
      .transition()
      .duration(1000)
      .attr 'fill', 'white'
    aRatioRect
      .attr "width", Math.sqrt area*vevent.aRatio
      .attr "height", Math.sqrt area/vevent.aRatio

  eventAngle = (vevent) ->
    # remove the gray from all the origins
    svg.selectAll('.origin')
      .attr 'fill', 'black'

    angleRect
      .transition()
      .duration(50)
      .attr 'fill', '#b35c1e'
      .transition()
      .duration(500)
      .attr 'fill', 'white'
      .attr "transform", "rotate(" + vevent.angle + ", " + angleRectCX + ", " + angleRectCY + ")"

  eventModifOrigin = (vevent) ->
    # clean-up previous data
    svg.select('#modifOrigins').remove()
    svg.select("#rect-center").remove()
    svg.select("#attempt").remove()

    # gray-out the previous origin
    prevIdx = vevent.idx - 1
    if prevIdx < 0 then prevIdx = svg.selectAll("circle.origin").size() - 1
    svg.select('#origin-' + prevIdx)
      .style 'stroke', null
      .style 'stroke-width', null
      .attr 'r', 3
    
    # highlight the current origin
    svg.select('#origin-' + vevent.idx)
      .attr 'fill', 'gray'
      .attr 'r', 5
      .style 'stroke', 'black'
      .style 'stroke-width', 2

    g = svg.append("g")
      .attr 'id', 'modifOrigins'
    
    # draw the new corrected origins
    originW = g.append("circle")
      .attr "cx", (d) -> scaleX vevent.modifOrigins[0][0]
      .attr "cy", (d) -> scaleY vevent.modifOrigins[0][1]
      .attr "r", 3
      .attr 'fill', '#b35c1e'

    originH = g.append("circle")
      .attr "cx", (d) -> scaleX vevent.modifOrigins[1][0]
      .attr "cy", (d) -> scaleY vevent.modifOrigins[1][1]
      .attr "r", 3
      .attr 'fill', '#b35c1e'

    # draw the lines around the origin
    lineW = g.append("line")
      .attr "x1", scaleX vevent.p1W[0]
      .attr "y1", scaleY vevent.p1W[1]
      .attr "x2", scaleX vevent.p2W[0]
      .attr "y2", scaleY vevent.p2W[1]
      .attr "stroke", 'black'
    
    lineH = g.append("line")
      .attr "x1", scaleX vevent.p1H[0]
      .attr "y1", scaleY vevent.p1H[1]
      .attr "x2", scaleX vevent.p2H[0]
      .attr "y2", scaleY vevent.p2H[1]
      .attr "stroke", 'black'

  handleEvent = (idx, nextStep) ->
    return if idx isnt runningIdx
    progressRect.attr 'width', (eventIdx*100 / events.length).toFixed()
    if ++eventIdx >= events.length
      svg.select('#modifOrigins').remove()
      svg.select("#rect-center").remove()
      svg.select("#attempt").remove()
      return
    vevent = events[eventIdx]
    
    switch vevent.type
      when 'simplify' then eventPolygon vevent
      when 'origins' then eventOrigins vevent
      when 'modifOrigin' then eventModifOrigin vevent
      when 'origin' then eventOrigin vevent
      when 'rectangle' then eventRectangle vevent
      when 'angle' then eventAngle vevent
      when 'aRatio' then eventARatio vevent
    if not nextStep then setTimeout handleEvent, delay, idx
  ++runningIdx
  if runningIdx is 0
    d3.select('#restart').classed 'disabled', false
    handleEvent runningIdx
