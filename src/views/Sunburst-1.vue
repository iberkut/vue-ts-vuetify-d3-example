<template>
  <div class="sunburst-1">
  </div>
</template>

<script lang="ts">
  import * as d3            from 'd3';
  import { Component, Vue } from 'vue-property-decorator';

  const nodeData = {
    'name': 'TOPICS', 'children': [{
      'name': 'Topic A',
      'children': [{ 'name': 'Sub A1', 'size': 4 }, { 'name': 'Sub A2', 'size': 4 }]
    }, {
      'name': 'Topic B',
      'children': [{ 'name': 'Sub B1', 'size': 3 }, { 'name': 'Sub B2', 'size': 3 }, {
        'name': 'Sub B3', 'size': 3
      }]
    }, {
      'name': 'Topic C',
      'children': [{ 'name': 'Sub A1', 'size': 4 }, { 'name': 'Sub A2', 'size': 4 }]
    }]
  };

  const width = 500;  // <-- 1
  const height = 500;
  const radius = Math.min(width, height) / 2;  // < -- 2
  const color = d3.scaleOrdinal(d3.schemeCategory10);   // <-- 3

  @Component
  export default class Sunburst1 extends Vue {
    private mounted() {

      const svg = d3.select(this.$el).append('svg');

      const g = svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const partition = d3.partition()
        .size([2 * Math.PI, radius]);

      const root = d3.hierarchy(nodeData)
        .sum(function (d) {
          return d.size;
        });

      partition(root);
      const arc = d3.arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });

      g.selectAll('path')
        .data(root.descendants())
        .enter()
        .append('path')
        .attr('display', function (d) { return d.depth ? null : 'none'; })
        .attr('d', arc)
        .style('stroke', '#fff')
        .style('fill', function (d) { return color((d.children ? d : d.parent).data.name); });
    }
  }
</script>
