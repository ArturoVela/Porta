export const GITHUB_USERNAME = "ArturoVela";
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

export interface GitHubSummary {
  publicRepos: number;
  followers: number;
  stars: number;
  createdAt: string;
  languages: { name: string; bytes: number }[];
  fetchedAt: string;
  stale?: boolean;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubCalendar {
  days: ContributionDay[];
  from: string;
  to: string;
  fetchedAt: string;
  stale?: boolean;
}

export function activityMetrics(days: ContributionDay[]) {
  let total = 0, activeDays = 0, streak = 0, bestStreak = 0;
  for (const day of days) {
    total += day.count;
    if (day.count > 0) {
      activeDays++;
      streak++;
      bestStreak = Math.max(bestStreak, streak);
    } else streak = 0;
  }
  return { total, activeDays, bestStreak };
}

export function contributionWeeks(days: ContributionDay[]) {
  if (!days.length) return [];
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array<null>(offset).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let index = 0; index < cells.length; index += 7) {
    const week = cells.slice(index, index + 7);
    weeks.push([...week, ...Array<null>(7 - week.length).fill(null)]);
  }
  return weeks;
}
