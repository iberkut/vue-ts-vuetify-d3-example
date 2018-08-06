<template>
  <div class="sunburst-2">
  </div>
</template>

<script lang="ts">
  import * as d3            from 'd3';
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Sunburst2 extends Vue {
    private mounted() {

      const width = 500;
      const height = 500;
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const svg = d3.select(this.$el).append('svg');

      const g = svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const partition = d3.partition()
        .size([2 * Math.PI, radius]);

      d3.json('data/data.json').then(nodeData => {

        const root = d3.hierarchy(nodeData)
          .sum(function (d) {
            return d.size;
          });

        partition(root);
        const arc = d3.arc()
          .startAngle(function (d) {
            return d.x0;
          })
          .endAngle(function (d) {
            return d.x1;
          })
          .innerRadius(function (d) {
            return d.y0;
          })
          .outerRadius(function (d) {
            return d.y1;
          });

        g.selectAll('g')
          .data(root.descendants())
          .enter().append('g').attr('class', 'node')
          .append('path')
          .attr('display', function (d) {
            return d.depth ? null : 'none';
          })
          .attr('d', arc)
          .style('stroke', '#fff')
          .style('fill', function (d) {
            return color((d.children ? d : d.parent).data.name);
          });

        g.selectAll('.node')
          .append('text')
          .attr('transform', function (d) {
            return 'translate(' + arc.centroid(d) + ')rotate(' + computeTextRotation(d) + ')';
          })
          .attr('dx', '-20')
          .attr('dy', '.5em')
          .text(function (d) {
            return d.parent ? d.data.name : '';
          });

        function computeTextRotation(d) {
          const angle = (d.x0 + d.x1) / Math.PI * 90;
          // Avoid upside-down labels
          return (angle < 90 || angle > 270) ? angle : angle + 180;  // "labels aligned with slices"
          // Alternate label formatting
          //return (angle < 180) ? angle - 90 : angle + 90;  // "labels as spokes"
        }

      })
        .catch(err => {
          console.log(err);
        });

    }

    /**
     * Calculate the correct distance to rotate each label based on its location in the sunburst.
     * @param {Node} d
     * @return {Number}
     */
    private computeTextRotation(d) {
      const angle = (d.x0 + d.x1) / Math.PI * 90;

      // Avoid upside-down labels
      return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
      //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
    }
  }
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Raleway');

  body {
    font-family: "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
