export interface ModelBlock {
  name: string;
  n: number;
  columns: string[];
  rows: {
    metric: string;
    values: (number | string | null)[];
  }[];
}

export interface SummaryRow {
  model: string;
  values: Record<string, number | string | null>;
}

const columns = ["r1F", "r250", "r1sm", "r5sm", "r10sm", "r30sm", "r60sm", "r120sm", "r10log25"];

export const modelBlocks: ModelBlock[] = [
  {
    name: "steps25_ALL_SYMBOLCOUNT_10000_r10log25_d#1",
    n: 162,
    columns,
    rows: [
      { metric: "corr", values: [0.1015, 0.1041, 0.2647, 0.2660, 0.2035, 0.1433, 0.1426, 0.0989, 0.2037] },
      { metric: "bias_90", values: [0.1061, 0.2860, 1.18, 2.83, 2.77, 2.50, 2.98, 2.11, 2.77] },
      { metric: "bias_95", values: [0.1815, 0.4486, 0.7331, 1.24, 0.7839, -0.0683, 0.2122, -1.61, 0.7887] },
      { metric: "bias_98", values: [0.3942, 0.7257, 0.8848, -1.43, -2.58, -3.22, -3.48, -5.91, -2.57] },
      { metric: "bias_99", values: [0.2641, -0.4816, 9.01, 8.75, 6.45, 5.17, 4.14, 0.5619, 6.45] },
      { metric: "winRatio_90", values: [1.0, 0.7647, 0.7647, 0.8235, 0.7647, 0.6471, 0.6471, 0.6471, 0.7647] },
      { metric: "winRatio_95", values: [1.0, 0.7778, 0.7778, 0.8889, 0.8889, 0.6667, 0.6667, 0.6667, 0.8889] },
      { metric: "min", values: [-12.11, null, null, null, null, null, null, null, null] },
      { metric: "max", values: [6.79, null, null, null, null, null, null, null, null] },
      { metric: "std", values: [2.17, null, null, null, null, null, null, null, null] },
      { metric: "autocorr", values: [null, null, null, null, null, null, null, null, null] },
    ],
  },
  {
    name: "steps25_ALL_SYMBOLCOUNT_10000_r10sm_d#1",
    n: 162,
    columns,
    rows: [
      { metric: "corr", values: [0.1130, 0.1030, 0.2542, 0.2526, 0.1852, 0.1270, 0.1298, 0.0873, 0.1854] },
      { metric: "bias_90", values: [0.1061, 0.3021, 1.43, 3.02, 2.96, 2.69, 3.23, 2.33, 2.97] },
      { metric: "bias_95", values: [0.1815, 0.4486, 0.7331, 1.24, 0.7839, -0.0683, 0.2122, -1.61, 0.7887] },
      { metric: "bias_98", values: [0.3942, 0.7257, 0.8848, -1.43, -2.58, -3.22, -3.48, -5.91, -2.57] },
      { metric: "bias_99", values: [0.2641, -0.4816, 9.01, 8.75, 6.45, 5.17, 4.14, 0.5619, 6.45] },
      { metric: "winRatio_90", values: [1.0, 0.8235, 0.8235, 0.8235, 0.7647, 0.6471, 0.7059, 0.7059, 0.7647] },
      { metric: "winRatio_95", values: [1.0, 0.7778, 0.7778, 0.8889, 0.8889, 0.6667, 0.6667, 0.6667, 0.8889] },
      { metric: "min", values: [-12.91, null, null, null, null, null, null, null, null] },
      { metric: "max", values: [7.50, null, null, null, null, null, null, null, null] },
      { metric: "std", values: [2.34, null, null, null, null, null, null, null, null] },
      { metric: "autocorr", values: [null, null, null, null, null, null, null, null, null] },
    ],
  },
  {
    name: "steps25_SELECT_SYMBOLCOUNT_10000_r10log25_d#1",
    n: 162,
    columns,
    rows: [
      { metric: "corr", values: [0.0947, 0.1242, 0.2727, 0.2664, 0.2054, 0.1410, 0.1422, 0.1011, 0.2056] },
      { metric: "bias_90", values: [0.1061, 0.3021, 1.44, 3.06, 2.94, 2.73, 3.33, 2.42, 2.94] },
      { metric: "bias_95", values: [0.1815, 0.8799, 1.36, 3.34, 2.88, 2.20, 2.77, 1.17, 2.88] },
      { metric: "bias_98", values: [0.3942, 0.7257, 0.8848, -1.43, -2.58, -3.22, -3.48, -5.91, -2.57] },
      { metric: "bias_99", values: [0.2641, -0.4816, 9.01, 8.75, 6.45, 5.17, 4.14, 0.5619, 6.45] },
      { metric: "winRatio_90", values: [1.0, 0.8235, 0.8235, 0.8824, 0.7647, 0.7059, 0.7059, 0.7059, 0.7647] },
      { metric: "winRatio_95", values: [1.0, 0.8889, 0.8889, 0.8889, 0.8889, 0.6667, 0.6667, 0.6667, 0.8889] },
      { metric: "min", values: [-11.89, null, null, null, null, null, null, null, null] },
      { metric: "max", values: [6.97, null, null, null, null, null, null, null, null] },
      { metric: "std", values: [2.16, null, null, null, null, null, null, null, null] },
      { metric: "autocorr", values: [null, null, null, null, null, null, null, null, null] },
    ],
  },
  {
    name: "steps25_SELECT_SYMBOLCOUNT_10000_r10sm_d#1",
    n: 162,
    columns,
    rows: [
      { metric: "corr", values: [0.0955, 0.1307, 0.2686, 0.2527, 0.1898, 0.1238, 0.1289, 0.0900, 0.1900] },
      { metric: "bias_90", values: [0.5267, 0.6813, 2.46, 3.06, 2.97, 1.88, 1.82, 1.01, 2.97] },
      { metric: "bias_95", values: [0.1815, 0.8799, 1.36, 3.34, 2.88, 2.20, 2.77, 1.17, 2.88] },
      { metric: "bias_98", values: [0.3942, 0.7257, 0.8848, -1.43, -2.58, -3.22, -3.48, -5.91, -2.57] },
      { metric: "bias_99", values: [0.2641, -0.4816, 9.01, 8.75, 6.45, 5.17, 4.14, 0.5619, 6.45] },
      { metric: "winRatio_90", values: [1.0, 0.7647, 0.8235, 0.8235, 0.7647, 0.6471, 0.5882, 0.6471, 0.7647] },
      { metric: "winRatio_95", values: [1.0, 0.8889, 0.8889, 0.8889, 0.8889, 0.6667, 0.6667, 0.6667, 0.8889] },
      { metric: "min", values: [-12.83, null, null, null, null, null, null, null, null] },
      { metric: "max", values: [7.74, null, null, null, null, null, null, null, null] },
      { metric: "std", values: [2.32, null, null, null, null, null, null, null, null] },
      { metric: "autocorr", values: [null, null, null, null, null, null, null, null, null] },
    ],
  },
];

export const summaryColumns = ["corr", "bias_90", "bias_95", "bias_98", "bias_99", "winRatio_90", "winRatio_95", "min", "max", "std", "length", "autocorr"];

export const summaryRows: SummaryRow[] = [
  { model: "steps25_ALL_…r10log25_d#1", values: { corr: 0.2035, bias_90: 2.77, bias_95: 0.7839, bias_98: -2.58, bias_99: 6.45, winRatio_90: 0.7647, winRatio_95: 0.8889, min: null, max: null, std: null, length: null, autocorr: null } },
  { model: "steps25_ALL_…r10sm_d#1", values: { corr: 0.1852, bias_90: 2.96, bias_95: 0.7839, bias_98: -2.58, bias_99: 6.45, winRatio_90: 0.7647, winRatio_95: 0.8889, min: null, max: null, std: null, length: null, autocorr: null } },
  { model: "steps25_SELECT_…r10log25_d#1", values: { corr: 0.2054, bias_90: 2.94, bias_95: 2.88, bias_98: -2.58, bias_99: 6.45, winRatio_90: 0.7647, winRatio_95: 0.8889, min: null, max: null, std: null, length: null, autocorr: null } },
  { model: "steps25_SELECT_…r10sm_d#1", values: { corr: 0.1898, bias_90: 2.97, bias_95: 2.88, bias_98: -2.58, bias_99: 6.45, winRatio_90: 0.7647, winRatio_95: 0.8889, min: null, max: null, std: null, length: null, autocorr: null } },
];
