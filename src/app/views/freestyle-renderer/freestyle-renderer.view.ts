import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
// import { sigma } from 'sigma';

@Component({
  templateUrl: './freestyle-renderer.view.html',
  styles: ['./freestyle-renderer.view.scss']
})
export class FreestyleRendererViewComponent implements OnInit {

  graph: any;

  constructor() {

  }

  ngOnInit(): void {
    console.log('init FreestyleRendererViewComponent');

    this.init();
  }


  private init() {

    let i;
    let s;
    const N = 100;
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

    // Instantiate sigma:
    s = new window['sigma']({
      graph: this.graph,
      settings: {
        enableHovering: false
      }
    });

    s.addRenderer({
      id: 'main',
      type: 'svg',
      container: document.getElementById('graph-container'),
      freeStyle: true
    });

    s.refresh();

    // Binding silly interactions
    function mute(node) {
      // tslint:disable-next-line:no-bitwise
      if (!~node.getAttribute('class').search(/muted/)) {
        node.setAttributeNS(null, 'class', node.getAttribute('class') + ' muted');
      }
    }

    function unmute(node) {
      node.setAttributeNS(null, 'class', node.getAttribute('class').replace(/(\s|^)muted(\s|$)/g, '$2'));
    }

    window['sigma'].classes.graph.addMethod('neighbors', function (nodeId) {

      const neighbors = {};
      const index = this.allNeighborsIndex.get(nodeId).keyList() || {};
      for (i = 0; i < index.length; i++) {
        neighbors[index[i]] = this.nodesIndex.get(index[i]);
      }
      return neighbors;
    });

    $('.sigma-node').click(function () {

      // Muting
      $('.sigma-node, .sigma-edge').each(function () {
        mute(this);
      });

      // Unmuting neighbors
      const neighbors = s.graph.neighborhood($(this).attr('data-node-id'));
      neighbors.nodes.forEach(function (node) {
        unmute($('[data-node-id="' + node.id + '"]')[0]);
      });

      neighbors.edges.forEach(function (edge) {
        unmute($('[data-edge-id="' + edge.id + '"]')[0]);
      });
    });

    s.bind('clickStage', function () {
      $('.sigma-node, .sigma-edge').each(function () {
        unmute(this);
      });
    });
  }
}
