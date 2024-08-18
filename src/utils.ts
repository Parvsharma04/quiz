export const shuffleArray = (arr: any[]): any[] => {
  return [...arr].sort(() => Math.random() - 0.5);
};

