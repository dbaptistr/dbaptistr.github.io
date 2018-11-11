import * as d3 from 'd3'

let margin = { top: 50, left: 125, right: 20, bottom: 100 }

let height = 600 - margin.top - margin.bottom
let width = 600 - margin.left - margin.right

let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var widthScale = d3
  .scaleLinear()
  .domain([0, 5000])
  .range([0, width])  

var yPositionScale = d3
  .scaleBand()
  .range([height, 0])
  .padding(0.25)

// var line = d3
//   .line()
//   .x(d => xPositionScale(d.year))
//   .y(d => yPositionScale(d.cumulativePoints))
//   .curve(d3.curveStepAfter)

d3.csv(require('./data/top_solicitantes.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(datapoints) {
  // Extract the year from the date column
  // Make sure points is a number

  // datapoints.sort((a, b) => a.pct_women - b.pct_women)

  var countries = datapoints.map(d => d.COUNTRY)
  yPositionScale.domain(countries)

  var yAxis = d3.axisLeft(yPositionScale)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)  

  var xAxis = d3
  .axisBottom(widthScale)
  .tickValues([0, 1000, 2000, 3000, 4000, 5000])


  svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)  

  svg
    .append('text')
    .attr('class', 'title-text')
    .attr('font-size', '20')
    .attr('text-anchor', 'middle')
    .text('Number of asylum requests per year')
    .attr('x', width / 2)
    .attr('y', -20)
    .attr('dx', 20)    

  svg
  .selectAll('.countries')
  .data(datapoints)
  .enter()
  .append('rect')
  .attr('class', 'countries')
  .attr('width', 0)
  .attr('fill', '#cb181d')
  .attr('height', yPositionScale.bandwidth())
  .attr('x', 0)
  .attr('y', function(d) {
    return yPositionScale(d.COUNTRY)
  })

  d3.select('#blank-graph').on('stepin', () => {
    svg
    .selectAll('.countries')
    .transition()
    .attr('width', 0)

  d3.select('#first-graph').on('stepin', () => {
    svg
    .selectAll('.countries')
    .transition()
    .attr('width', function(d) {
      return widthScale(d.SOLICITANTES13)
    })
  
  d3.select('#second-graph').on('stepin', () => {
      svg
      .selectAll('.countries')
      .transition()
      .attr('width', function(d) {
        return widthScale(d.SOLICITANTES14)
    })
    
    d3.select('#third-graph').on('stepin', () => {
      svg
      .selectAll('.countries')
      .transition()
      .attr('width', function(d) {
        return widthScale(d.SOLICITANTES15)
    })    
    
    d3.select('#fourth-graph').on('stepin', () => {
      svg
      .selectAll('.countries')
      .transition()
      .attr('width', function(d) {
        return widthScale(d.SOLICITANTES16)
    })    

    d3.select('#fifth-graph').on('stepin', () => {
      svg
      .selectAll('.countries')
      .transition()
      .attr('width', function(d) {
        return widthScale(d.SOLICITANTES17)
    })    

  })
  })
  })
  })
  })
})  
    
}


  // svg
  //   .selectAll('.country')
  //   .data(datapoints)
  //   .enter()
  //   .append('rect')
  //   .attr('class', 'country')
  //   .attr('y', d => yPositionScale(d.COUNTRY))
  //   .attr('x', 0)
  //   .attr('height', yPositionScale.bandwidth())
  //   .attr('width', d => xPositionScale(d.SOLICITANTES13))
  //   .attr('fill', '#67bea2')



 

  // svg
  //   .selectAll('rect')
  //   .data(datapoints)
  //   .enter()
  //   .append('rect')
  //   .attr('width', function(d) {
  //     return widthScale(d.SOLICITANTES13)
  //   })
  //   .attr('fill', '#999999')
  //   .attr('height', yPositionScale.bandwidth())
  //   .attr('x', 0)
  //   .attr('y', function(d) {
  //     return yPositionScale(d.countries)
  //   })

  // svg
  //   .selectAll('.countries-bg')
  //   .data(datapoints)
  //   .enter()
  //   .append('rect')
  //   .attr('class', 'countries-bg')
  //   .attr('y', d => yPositionScale(d.COUNTRY))
  //   .attr('x', 0)
  //   .attr('height', yPositionScale.bandwidth())
  //   .attr('width', width)
  //   .attr('fill', '#999999')

  // svg
  //   .selectAll('.instrument')
  //   .data(datapoints)
  //   .enter()
  //   .append('rect')
  //   .attr('class', 'instrument')
  //   .attr('y', d => yPositionScale(d.instrument))
  //   .attr('x', 0)
  //   .attr('height', yPositionScale.bandwidth())
  //   .attr('width', 0)
  //   .attr('fill', '#67bea2')

  // var yAxis = d3
  //   .axisLeft(yPositionScale)
  //   .tickSize(0)
  //   .tickFormat(d => d)

  // svg
  //   .append('g')
  //   .attr('class', 'axis y-axis')
  //   .call(yAxis)

  // svg
  //   .selectAll('.y-axis text')
  //   .attr('fill', '#999999')
  //   .attr('dx', -5)

  // var xAxis = d3
  //   .axisTop(xPositionScale)
  //   .tickValues([20, 40, 60, 80])
  //   .tickFormat(d => d + '%')
  //   .tickSize(-height)

  // svg
  //   .append('g')
  //   .attr('class', 'axis x-axis')
  //   .call(xAxis)
  //   .lower()

  // svg.selectAll('.axis line').attr('stroke', '#ccc')
  // svg.selectAll('.axis path').attr('stroke', 'none')

  // svg.selectAll('.axis text').attr('font-size', 18)
  // svg.selectAll('.x-axis text').attr('fill', '#999999')

 


    // Grab all the bars, make them 0
  //   svg
  //     .selectAll('.instrument')
  //     .transition()
  //     .attr('width', 0)
  //   svg.selectAll('.y-axis text').attr('fill', '#999')
  // })

  // d3.select('#intro-graph').on('stepin', () => {
  //   // Grab all the bars, make them normal
  //   svg
  //     .selectAll('.instrument')
  //     .transition()
  //     .attr('width', d => xPositionScale(d.pct_women))

  //   // Color all your y axis text
  //   svg.selectAll('.y-axis text').attr('fill', d => {
  //     if (d === 'Harp' || d === 'Flute' || d === 'Violin') {
  //       return '#67bea2'
  //     } else {
  //       return '#999999'
  //     }
  //   })
  //   svg
  //     .selectAll('.instrument-bg')
  //     .transition()
  //     .attr('fill', '#999999')
  // })

  // d3.select('#instruments-mentioned').on('stepin', () => {
  //   d3.selectAll('.majority-male')
  //     .style('background', '#E89A98')
  //     .style('color', 'white')

  //   svg
  //     .selectAll('.instrument-bg')
  //     .transition()
  //     .attr('fill', d => {
  //       var instruments = ['Bassoon', 'Double Bass', 'Timpani']

  //       // The ugly JavaScript way to say
  //       // "is this in my list?"
  //       if (instruments.indexOf(d.instrument) !== -1) {
  //         return '#E89A98'
  //       } else {
  //         return '#999999'
  //       }
  //     })
  // })

//   function render() {
//     console.log('Something happened')
//     let screenWidth = svg.node().parentNode.parentNode.offsetWidth
//     let screenHeight = window.innerHeight
//     let newWidth = screenWidth - margin.left - margin.right
//     let newHeight = screenHeight - margin.top - margin.bottom

//     // Update your SVG
//     let actualSvg = d3.select(svg.node().parentNode)
//     actualSvg
//       .attr('height', newHeight + margin.top + margin.bottom)
//       .attr('width', newWidth + margin.left + margin.right)

//     xPositionScale.range([0, newWidth])
//     yPositionScale.range([newHeight, 0])

//     // svg.selectAll('.instrument-bg')
//     //   .attr('width', newWidth)
//     //   .attr('height', yPositionScale.bandwidth())
//     //   .attr('y', d => yPositionScale(d.instrument))

//     svg
//       .selectAll('.country')
//       .attr('y', d => yPositionScale(d.instrument))
//       .attr('height', yPositionScale.bandwidth())
//       .attr('width', d => xPositionScale(d.SOLICITANTE13))

//     // svg
//     //   .select('.halfway-line')
//     //   .attr('x1', xPositionScale(50))
//     //   .attr('y1', 0)
//     //   .attr('x2', xPositionScale(50))
//     //   .attr('y2', newHeight)

//     // svg
//     //   .selectAll('.gender-label')
//     //   .attr('y', yPositionScale('Flute'))
//     //   .attr('x', d => (d === 'Women' ? 10 : newWidth - 10))
//     //   .attr('dy', yPositionScale.bandwidth() / 2 + 2)

//     // // If it's reaaaal small, resize the text
//     // if (newHeight < 400) {
//     //   svg.selectAll('text').attr('font-size', 12)
//     // } else {
//     //   svg.selectAll('text').attr('font-size', 20)
//     // }

//     xAxis.tickSize(-newHeight)
//     svg.select('.x-axis').call(xAxis)
//     svg.select('.y-axis').call(yAxis)
//   }

//   // Every time the window resizes, run the render function
//   window.addEventListener('resize', render)
//   render()

