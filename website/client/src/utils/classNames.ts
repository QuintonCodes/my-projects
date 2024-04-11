export const mergeClasses = (
  defaultClasses: string,
  overrideClasses: string
): string => {
  const defaultClassesArray = defaultClasses.split(" ");
  const overrideClassesArray = overrideClasses.split(" ");
  const classSet = new Set();

  overrideClassesArray.forEach((className) => {
    const baseClassName = className.split("-")[0];
    classSet.add(baseClassName);
  });

  defaultClassesArray.forEach((className) => {
    const baseClassName = className.split("-")[0];
    if (!classSet.has(baseClassName)) {
      classSet.add(className);
    }
  });

  overrideClassesArray.forEach((className) => {
    classSet.add(className);
  });

  return Array.from(classSet).join(" ");
};
