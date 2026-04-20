export function getOverviewStats(subjects, sessions) {
  const totalHours = sessions.reduce((acc, item) => acc + item.duration, 0)
  const avgFocus = sessions.length
    ? Math.round(sessions.reduce((acc, item) => acc + item.focus, 0) / sessions.length)
    : 0
  const distractionAvg = sessions.length
    ? (sessions.reduce((acc, item) => acc + item.distractions, 0) / sessions.length).toFixed(1)
    : '0.0'

  return {
    totalSubjects: subjects.length,
    totalSessions: sessions.length,
    totalHours,
    avgFocus,
    distractionAvg,
  }
}

export function getSubjectProgress(subjects, sessions) {
  return subjects.map((subject) => {
    const related = sessions.filter((s) => s.subjectId === subject.id)
    const spent = related.reduce((acc, s) => acc + s.duration, 0)
    const percent = subject.targetHours ? Math.min(100, Math.round((spent / subject.targetHours) * 100)) : 0

    return {
      id: subject.id,
      name: subject.name,
      targetHours: subject.targetHours,
      spent,
      percent,
      difficulty: subject.difficulty,
    }
  })
}

export function getBehaviorSignals(sessions) {
  if (!sessions.length) {
    return {
      bestMood: 'No data',
      attentionRisk: 'No data',
      recommendation: 'Log a few sessions to unlock personalized insights.',
    }
  }

  const moodCount = sessions.reduce((acc, item) => {
    acc[item.mood] = (acc[item.mood] || 0) + 1
    return acc
  }, {})

  const bestMood = Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0][0]
  const avgDistractions =
    sessions.reduce((acc, item) => acc + item.distractions, 0) / sessions.length

  const attentionRisk = avgDistractions > 3 ? 'High' : avgDistractions > 1.5 ? 'Moderate' : 'Low'

  let recommendation = 'Great consistency. Continue your current routine.'
  if (attentionRisk === 'High') {
    recommendation = 'Try shorter 45-minute deep work blocks and switch your study location.'
  } else if (attentionRisk === 'Moderate') {
    recommendation = 'Use a 5-minute break after every focused hour to stay steady.'
  }

  return {
    bestMood,
    attentionRisk,
    recommendation,
  }
}
