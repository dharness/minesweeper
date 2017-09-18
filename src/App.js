import React, { Component } from 'react';

class GridCell extends Component {

  constructor() {
    super();
    this.state = {
      isHidden: true
    }
  }

  searchSurroun

  handleClick() {
    alert(`${this.props.i}, ${this.props.j}`)
  }

  render() {
    return (<div
      onClick={this.handleClick.bind(this)}
      className={"grid--cell" + (this.isHidden ? ' hidden' : '')}
      key={`${this.props.i},${this.props.j}`}>
      {this.props.hasMine && 
        <div> M </div>
      }
      {!this.props.hasMine && 
        this.props.i + ',' +this.props.j
      }
    </div>)
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      width: 4,
      height: 4,
    }
    this.createGrid();
  }

  createGrid() {
    const grid = [...Array(this.state.width).keys()].map(_ => {
      return [...Array(this.state.height).fill(0)].map(() => {
        const hasMine = +`${Math.random()}`.charAt(2) % 2
        return {val: (hasMine ? 'M' : 0)}
      })
    });

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if(cell.val === 'M') {
          let topLeft = (grid[i-1] || [])[j-1];
          let topMiddle = (grid[i-1] || [])[j];
          let topRight = (grid[i-1] || [])[j+1];

          let left = grid[i][j-1];
          let right = grid[i][j+1];

          let bottomLeft = (grid[i+1] || [])[j-1];
          let bottomMiddle = (grid[i+1] || [])[j];
          let bottomRight = (grid[i+1] || [])[j+1];

          [topLeft, topMiddle, topRight, left, right, bottomLeft, bottomMiddle, bottomRight].map(el => {
            if(el && el.val !== 'M') {
              el.val = el.val + 1;
            }
          })
        }
      })
    });
    console.log(grid.map(row =>row.map(e => e.val)));
  }

  render() {
    return (
      <div>
        {
          [...Array(this.state.height)].map((_, i) => {
            return (<div className="grid--row">
              {
                [...Array(this.state.width)].map((_, j) => {
                  return (
                    <GridCell
                    hasMine={i%2 === 0}
                    i={i}
                    j={j}
                    key={`${i},${j}`}/>
                    )
                })
              }
            </div>)
          })
        }
      </div>
    );
  }
}

export default App;
