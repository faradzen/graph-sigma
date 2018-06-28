import { Component, OnInit } from '@angular/core';
import { sigma } from 'sigma';
// import 'node_modules/sigma/build/plugins/sigma.plugins.animate.min';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sigma-graph',
  templateUrl: './sigma-graph.component.html',
  styleUrls: ['./sigma-graph.component.scss']
})
export class SigmaGraphComponent implements OnInit {

  title = 'app';
  private containerId = 'my-container-id';
  sigmaInstance: sigma;

  savedState: any;

  constructor() {

  }

  ngOnInit(): void {
    console.log('init SigmaGraphComponent');


    this.exampleDragNodes();
    // this.exampleAnimate();
    // this.exampleTriangle();
    // Finally, let's ask our sigma instance to refresh:
    // this.sigmaInstance.refresh();
  }

  saveGraphState() {
    const instance = this.sigmaInstance;
    const savedGraph = JSON.stringify({
      nodes: instance.graph.nodes(),
      edges: instance.graph.edges()
    });
    this.savedState = {
      graph: JSON.parse(savedGraph),
      filename: 'stateSaved_' + Date.now()
    };
    console.log(this.savedState);
  }

  loadGraphState() {
    this.sigmaInstance.graph.clear();
    this.sigmaInstance.refresh();
    const self = this;
    setTimeout(function () {
      self.sigmaInstance.graph.read(self.savedState.graph);
      self.sigmaInstance.refresh();
    }, 300);

    //     // Adding node
    // sigInstance.graph.addNode(params);

    // // Adding edge
    // sigInstance.graph.addEdge(params);

    // // You can also use the read method if you already have a object of nodes and edges
    // sigInst.graph.read({nodes: [...], edges: [...]});

    // // Updating nodes
    // sigInstance.graph.nodes().forEach(function(n) {
    //   n.size = 34;
    //   n.color = '#000';
    // });

    // // Replace 'nodes' by 'edges' for the edges

    // // Don't forget to refresh your instance when done so the new graph is correctly displayed
    // sigInst.refresh();

    // // If you want to clear the graph, use the clear method
    // sigInst.graph.clear(); // graph now empty
  }


  private exampleDragNodes() {
    /**
 * This example shows how to use the dragNodes plugin.
 */
    let i;
    let s;
    const N = 10;
    const E = 500;
    const g = {
      nodes: [],
      edges: []
    };

    // Generate a random graph:
    for (i = 0; i < N; i++) {
      g.nodes.push({
        id: 'n' + i,
        label: 'Node ' + i,
        x: Math.random(),
        y: Math.random(),
        size: Math.random(),
        color: '#666'
      });
    }

    for (i = 0; i < E; i++) {
      g.edges.push({
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
    this.sigmaInstance = new sigma({
      graph: g,
      container: this.containerId
    });

    // Initialize the dragNodes plugin:
    const dragListener = window['sigma'].plugins.dragNodes(this.sigmaInstance, this.sigmaInstance.renderers[0]);

    dragListener.bind('startdrag', function (event) {
      console.log(event);
    });
    dragListener.bind('drag', function (event) {
      console.log(event);
    });
    dragListener.bind('drop', function (event) {
      console.log(event);
    });
    dragListener.bind('dragend', function (event) {
      console.log(event);
    });
  }

  private exampleTriangle() {
    const graph = {
      nodes: [
        {
          id: 'n0',
          label: 'A node',
          x: 0,
          y: 0,
          size: 3
        },
        {
          id: 'n1',
          label: 'Another node',
          x: 3,
          y: 1,
          size: 2
        },
        {
          id: 'n2',
          label: 'And a last one',
          x: 1,
          y: 3,
          size: 1
        }
      ],
      edges: [
        {
          id: 'e0',
          source: 'n0',
          target: 'n1'
        },
        {
          id: 'e1',
          source: 'n1',
          target: 'n2'
        },
        {
          id: 'e2',
          source: 'n2',
          target: 'n0'
        }
      ]
    };

    this.initSigmaGraph(graph, this.containerId);

  }


  private exampleAnimate() {

    let i;
    let o;
    const L = 10;
    const N = 100;
    const E = 500;
    const g = {
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

      g.nodes.push(o);
    }

    for (i = 0; i < E; i++) {
      g.edges.push({
        id: 'e' + i,
        // tslint:disable-next-line:no-bitwise
        source: 'n' + (Math.random() * N | 0),
        // tslint:disable-next-line:no-bitwise
        target: 'n' + (Math.random() * N | 0)
      });
    }

    // Instantiate sigma:
    this.initSigmaGraph(g, this.containerId);
    this.initAnimation();

  }

  private initSigmaGraph(graph: any, containerName: string) {
    this.sigmaInstance = new sigma({
      graph: graph,
      container: containerName,
      settings: {
        animationsTime: 1000
      }
    });
  }

  private initAnimation() {
    let step = 0;
    const self = this;
    setInterval(function () {
      const prefix = ['grid_', 'circular_'][step = +!step];

      window['sigma'].plugins.animate(
        self.sigmaInstance,
        {
          x: prefix + 'x',
          y: prefix + 'y',
          size: prefix + 'size',
          color: prefix + 'color'
        }
      );
    }, 2000);
  }

}
