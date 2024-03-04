export const getWindDirectionLabel = (windDegree) => {
    let label;
  
    switch (true) {
      case windDegree > 315:
        label = "NNW";
        break;
      case windDegree === 315:
        label = "NW";
        break;
      case windDegree > 270:
        label = "WNW";
        break;
      case windDegree === 270:
        label = "W";
        break;
      case windDegree > 225:
        label = "WSW";
        break;
      case windDegree === 225:
        label = "SW";
        break;
      case windDegree > 180:
        label = "SSW";
        break;
      case windDegree === 180:
        label = "S";
        break;
      case windDegree > 135:
        label = "SSE";
        break;
      case windDegree === 135:
        label = "SE";
        break;
      case windDegree > 90:
        label = "ESE";
        break;
      case windDegree === 90:
        label = "E";
        break;
      case windDegree > 45:
        label = "ENE";
        break;
      case windDegree === 45:
        label = "NE";
        break;
      case windDegree > 0:
        label = "NNE";
        break;
      default:
        label = "N";
    }

    return label
  }

export const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-us", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }