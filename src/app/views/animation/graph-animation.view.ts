import { Component, OnInit, Input } from '@angular/core';

@Component({
  templateUrl: './graph-animation.view.html'
})
export class GraphAnimationViewComponent implements OnInit {

  graph: any;

  constructor() {
    this.exampleAnimateInit();
  }

  ngOnInit(): void {
    console.log('init GraphAnimationViewComponent');
  }


  private exampleAnimateInit() {

    let i;
    let o;
    const L = 10;
    const N = 100;
    const E = 500;
    this.graph = {
      nodes: [],
      edges: []
    };

    // Generate a random graph:
    for (i = 0; i < N; i++) {
      o = {
        id: 'n' + i,
        label: 'Node ' + i,
        circular_x: L * Math.cos(Math.PI * 2 * i / N - Math.PI / 2),
        circular_y: L * Math.sin(Math.PI * 2 * i / N - Math.PI / 2),
        circular_size: Math.random(),
        circular_color: '#' + (
          Math.floor(Math.random() * 16777215).toString(16) + '000000'
        ).substr(0, 6),
        grid_x: i % L,
        grid_y: Math.floor(i / L),
        grid_size: 1,
        grid_color: '#ccc'
      };

      ['x', 'y', 'size', 'color'].forEach(function (val) {
        o[val] = o['grid_' + val];
      });

      this.graph.nodes.push(o);
    }

    for (i = 0; i < E; i++) {
      this.graph.edges.push({
        id: 'e' + i,
        // tslint:disable-next-line:no-bitwise
        source: 'n' + (Math.random() * N | 0),
        // tslint:disable-next-line:no-bitwise
        target: 'n' + (Math.random() * N | 0)
      });
    }

    // Instantiate sigma:
    // this.initSigmaGraph(g, this.containerId);
    // this.initAnimation();

  }
}
