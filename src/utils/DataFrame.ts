import * as d3 from 'd3';

export default class DataFrame {
  data;
  columns;
  cols;
  Xs;
  Ys;
  len;

  constructor(props) {
    console.log(props.data);
    this.data = Array.from(props.data);
    this.columns = this.data.columns;
    this.cols = {};
    this.len = props.data.length;
    this.Xs = Array.from([]);
    this.Ys = Array.from([]);
    this.onInit(this.data);
    this.parseColumns();
  }

  onInit(data) {
    this.data.forEach(d => {
      this.Xs.push(d.x);
      this.Ys.push(d.y);
    });
  }

  parseColumns() {
    try {
      this.columns.forEach(c => {
        this.cols[c] = [];
      });
      this.data.forEach(d => {
        this.columns.forEach(c => {
          this.cols[c].push(d[c]);
        });
      });
    } catch (error) {
      console.log('E:: ', error);
    }
  }

  maxXs() {
    return Number(d3.max(this.Xs)) as number;
  }

  minXs() {
    return Number(d3.min(this.Xs)) as number;
  }

  maxYs() {
    return Number(d3.max(this.Ys)) as number;
  }

  minYs() {
    return Number(d3.min(this.Ys)) as number;
  }
}
