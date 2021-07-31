import React from "react";

const PieChart = ({ nestedLogs, grandTotal }) => {
  let th = 30;
  let r = 80;
  let midd = r - th;
  let colorsFill = nestedLogs.map((e) => e.category.color);
  //["e3e334", "31ebde", "21eb32", "f2723f", "b0b0b0"];

  let preTotal = 0;
  return (
    <div style={{ width: `${2 * r}px`, margin: "1.1rem auto" }}>
      <svg width={2 * r} height={2 * r}>
        {nestedLogs.map((e, i, list) => {
          let prp = e.total / grandTotal;
          let angle = 2 * prp * Math.PI;
          let angle360 = preTotal * 360;
          preTotal = preTotal + prp;
          let si = Math.sin(angle).toPrecision(4);
          let co = Math.cos(angle).toPrecision(4);
          return (
            <path
              key={i}
              transform={`rotate(${angle360} ${r} ${r})`}
              d={`M${r} ${th}
              l0 -${th}
              a${r} ${r} 0 ${prp > 0.5 ? 1 : 0} 1 ${r * si} ${-r * co + r}
              l${-th * si} ${th * co}
              a${r - th} ${r - th} 0 ${prp > 0.5 ? 1 : 0} 0 ${-midd * si} ${
                midd * co - midd
              }
          Z`}
              fill={`#${colorsFill[i]}`}
            ></path>
          );
        })}
      </svg>
    </div>
  );
};

export default PieChart;
