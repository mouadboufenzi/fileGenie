
export function getLatestVersion(versions: string[]) {
  // Validate the version strings to ensure they follow semver format
  const semverRegex = /^\d+\.\d+$/;
  const validVersions = versions.filter((version) => semverRegex.test(version));

  if (validVersions.length === 0) {
    throw new Error('No valid semantic version strings found in the array.');
  }

  // Use the `sort` method to determine the latest version
  validVersions.sort((a, b) => {
    const [majorA, minorA] = a.split('.').map(Number);
    const [majorB, minorB] = b.split('.').map(Number);

    if (majorA !== majorB) return majorB - majorA;
    return minorB - minorA;
  });

  // Return the first version in the sorted list
  return validVersions[0];
}