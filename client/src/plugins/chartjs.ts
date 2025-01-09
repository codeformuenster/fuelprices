import { Chart } from 'chart.js';

export type Point = {
  index: number,
  label: string
}

export const verticalLinePlugin = {
  getLinePosition: function (chart: Chart, point: Point) {
    const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
    const data = meta.data;
    return data[point.index].x;
  },

  renderVerticalLine: function (chartInstance: Chart, point: Point) {
    const lineLeftOffset = this.getLinePosition(chartInstance, point);

    if (lineLeftOffset) {
      const scale = chartInstance.scales.y;
      const context = chartInstance.ctx;
      // render vertical line
      context.beginPath();
      context.strokeStyle = '#666666';
      context.moveTo(lineLeftOffset, scale.top);
      context.lineTo(lineLeftOffset, scale.bottom);
      context.stroke();

      // write label
      context.fillStyle = '#666666';
      context.textAlign = 'right';
      context.fillText(point.label, lineLeftOffset - 5, scale.top + 5);
    }

  },

  beforeDatasetsDraw: function (chart: Chart) {
    if (chart.config._config.options.lineAtIndex)
      chart.config._config.options.lineAtIndex.forEach((point: Point) => this.renderVerticalLine(chart, point));
  }
};