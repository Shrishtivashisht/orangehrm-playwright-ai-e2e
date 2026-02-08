export function generateEmployee() {
  const timestamp = Date.now();
  return {
    firstName: `AI_${timestamp}`,
    lastName: `QA`,
  };
}
