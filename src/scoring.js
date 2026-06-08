export function calcExisting(d) {
  const briCountScore = d.existBriCount2km > 1 ? 100 : 25;

  let briDistScore = 25;
  if (d.existBriDistLt1) {
    if (d.existBriType === "KC") briDistScore = 100;
    else if (d.existBriType === "KCP") briDistScore = 60;
    else if (d.existBriType === "Unit") briDistScore = 30;
    else if (d.existBriType === "KK") briDistScore = 10;
  }
  const ukoBri = briCountScore * 0.8 + briDistScore * 0.2;

  const peersCountScore = d.existPeersCount2km > 0 ? 25 : 100;

  const peersDistScore = d.existPeersDistLt1 ? 25 : 100;
  const ukoPeers = peersCountScore * 0.8 + peersDistScore * 0.2;

  const potensiMap = { Star: 25, Growth: 50, Saturated: 75, Laggard: 100 };
  const potensi = potensiMap[d.existPotensi] || 0;

  const perfMap = { High: 25, Medium: 50, Low: 100 };
  const perf = perfMap[d.existPerf] || 0;

  const total = ukoBri * 0.2 + ukoPeers * 0.2 + potensi * 0.4 + perf * 0.2;
  return { total, detail: { ukoBri, ukoPeers, potensi, perf } };
}

export function calcCandidate(d) {
  const briCountScore = d.candBriCount2km > 1 ? 0 : 100;

  let briDistScore = 100;
  if (d.candBriDistLt1) {
    if (d.candBriType === "KC") briDistScore = 25;
    else if (d.candBriType === "KCP") briDistScore = 50;
    else if (d.candBriType === "Unit") briDistScore = 75;
    else if (d.candBriType === "KK") briDistScore = 90;
    else briDistScore = 100;
  }
  const ukoBri = briCountScore * 0.2 + briDistScore * 0.8;

  const peersCountScore = d.candPeersCount2km > 0 ? 100 : 25;

  const peersDistScore = d.candPeersDistLt1 ? 100 : 25;
  const ukoPeers = peersCountScore * 0.2 + peersDistScore * 0.8;

  const potensiMap = { Star: 100, Growth: 75, Saturated: 50, Laggard: 25 };
  const potensi = potensiMap[d.candPotensi] || 0;

  const total = ukoBri * 0.2 + ukoPeers * 0.2 + potensi * 0.6;
  return { total, detail: { ukoBri, ukoPeers, potensi } };
}
