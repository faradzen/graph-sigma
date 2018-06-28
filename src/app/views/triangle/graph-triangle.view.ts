import { Component, OnInit, Input } from '@angular/core';

@Component({
  templateUrl: './graph-triangle.view.html'
})
export class GraphTriangleViewComponent implements OnInit {


  graph: any;

  constructor() {
    this.exampleTriangleInit();
  }

  ngOnInit(): void {
    console.log('init GraphTriangleViewComponent');
  }

  private exampleTriangleInit() {
    this.graph = {
      nodes: [
        { id: 'n0', label: 'A node', x: 0, y: 0, size: 3 },
        { id: 'n1', label: 'Another node', x: 3, y: 1, size: 2 },
        { id: 'n2', label: 'And a last one', x: 1, y: 3, size: 1 },
        { id: 'n3', label: 'child1', x: 0, y: 5, size: 2, color: '#fb0101' },
        { id: 'n4', label: 'child2', x: 1, y: 5, size: 2, customAttr: 'aloha custom attr', color: '#fb0101' }
      ],
      edges: [
        { id: 'e0', source: 'n0', target: 'n1' },
        { id: 'e1', source: 'n1', target: 'n2', color: '#399c3b' },
        { id: 'e2', source: 'n2', target: 'n0' },
        { id: 'e3', source: 'n2', target: 'n3', color: '#5d78d4' },
        { id: 'e4', source: 'n2', target: 'n4', color: '#5d78d4' }
      ]
    };
  }
}
