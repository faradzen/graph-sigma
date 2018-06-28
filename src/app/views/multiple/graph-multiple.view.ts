import { Component, OnInit, Input } from '@angular/core';

@Component({
  templateUrl: './graph-multiple.view.html'
})
export class GraphMultipleViewComponent implements OnInit {

  graph: any;

  constructor() {
    this.exampleDragNodesInit();
  }

  ngOnInit(): void {
    console.log('init GraphMultipleViewComponent');
  }


  private exampleDragNodesInit() {
    /**
 * This example shows how to use the dragNodes plugin.
 */
    let i;
    const N = 10;
    const E = 500;
    this.graph = {
      nodes: [],
      edges: []
    };

    // Generate a random graph:
    for (i = 0; i < N; i++) {
      this.graph.nodes.push({
        id: 'n' + i,
        label: 'Node ' + i,
        x: Math.random(),
        y: Math.random(),
        size: Math.random(),
        color: '#666'
      });
    }

    for (i = 0; i < E; i++) {
      this.graph.edges.push({
        id: 'e' + i,
        // tslint:disable-next-line:no-bitwise
        source: 'n' + (Math.random() * N | 0),
        // tslint:disable-next-line:no-bitwise
        target: 'n' + (Math.random() * N | 0),
        size: Math.random(),
        color: '#ccc'
      });
    }
    // sigma.renderers.def = sigma.renderers.canvas
    // Instantiate sigma:
    // this.sigmaInstance = new sigma({
    //   graph: g,
    //   container: this.containerId
    // });

    // this.pluginDragNodesEnable();
  }
}
