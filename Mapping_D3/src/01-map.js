import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 500 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

let projection = d3.geoMercator()
let graticule = d3.geoGraticule()

let path = d3.geoPath().projection(projection)

Promise.all([
  d3.json(require('./data/world.topojson')),
  d3.csv(require('./data/world-cities.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready([json, datapoints]) {
  console.log(json.objects) // to find out how the layer you need is called
  let countries = topojson.feature(json, json.objects.countries)

  console.log(datapoints)

  svg
    .selectAll('.world-map')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'world-map')
    .attr('d', path)
    .attr('fill', 'black')
    .style('background-color', 'black')

  let colorScale = d3
    .scaleSequential(d3.interpolateCool)
    .domain([0, 250000])
    .clamp(true)

  svg
    .selectAll('.cities-dots')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'cities-dots')
    .attr('r', 0.5)
    .attr('transform', d => {
      let coords = projection([d.lng, d.lat])
      return `translate(${coords})`
    })
    .attr('fill', d => {
      return colorScale(d.population)
    })

  svg
    .append('path')
    .datum(graticule())
    .attr('d', path)
    .attr('stroke', 'lightgrey')
    .attr('opacity', 0.5)
    .lower()

  svg
    .append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'black')
    .lower()
}
