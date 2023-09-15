const useOperatingSystem = () => {
  const type = navigator.userAgent;

  switch (true) {
    case type.search("Windows") !== -1:
      return "Windows";
    case type.search("Mac") !== -1:
      return "MacOS";
    case type.search("X11") !== -1 && !(type.search("Linux") !== -1):
      return "UNIX";
    case type.search("Linux") !== -1 && type.search("X11") !== -1:
      return "Linux";
    default:
      return "Unknown";
  }
};

export default useOperatingSystem;
