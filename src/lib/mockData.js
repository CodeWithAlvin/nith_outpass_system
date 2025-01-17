export function generateMockOutpasses(count) {
  const outpasses = [];
  const reasons = ["market", "home"];
  const statuses = ["approved", "rejected", "pending"];

  for (let i = 0; i < count; i++) {
    const fromDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
    const toDate = new Date(fromDate.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000);

    outpasses.push({
      id: `OUT${i + 1}`,
      rollNumber: `R${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      fromDate: fromDate.toISOString().split('T')[0],
      toDate: toDate.toISOString().split('T')[0],
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      place: Math.random() > 0.5 ? "City Center" : "Home Town",
      isOut: Math.random() > 0.5,
      dateFilled: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  }

  return outpasses;
}

