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

  sigmaInstance: sigma;

  constructor() {

  }

  ngOnInit(): void {
    console.log('init SigmaGraphComponent');
    // const s1 = new sigma('my-container-id');

    // const s3 = new sigma({
    //   container: document.getElementById('my-container-id')
    // });
    // const s4 = new sigma({
    //   renderers: [{
    //     container: document.getElementById('my-container-id')
    //   }]
    // });

    // const s = new sigma(document.getElementById('my-container-id'));
    // s.graph.addNode({
    //   // Main attributes:
    //   id: 'n0',
    //   label: 'Hello',
    //   // Display attributes:
    //   x: 0,
    //   y: 0,
    //   size: 1,
    //   color: '#f00'
    // }).addNode({
    //   // Main attributes:
    //   id: 'n1',
    //   label: 'World !',
    //   // Display attributes:
    //   x: 1,
    //   y: 1,
    //   size: 1,
    //   color: '#00f'
    // }).addEdge({
    //   id: 'e0',
    //   // Reference extremities:
    //   source: 'n0',
    //   target: 'n1'
    // });

    // s.settings({
    //   edgeColor: 'default',
    //   defaultEdgeColor: '#999'
    // });

    let i;
    let o;
    let L = 10;
    let N = 100;
    let E = 500;
    let g = {
      nodes: [],
      edges: []
    };
    let step = 0;

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
    this.sigmaInstance = new sigma({
      graph: g,
      container: 'my-container-id',
      settings: {
        animationsTime: 1000
      }
    });
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

    // Finally, let's ask our sigma instance to refresh:
    self.sigmaInstance.refresh();
  }

}
