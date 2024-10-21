export const convertToGeoJSONLatLong = (geometryStr) => {
  let geometryType, coordinatesStr;
  let coordinates;
  if (geometryStr) {
    if (geometryStr.startsWith("LINESTRING")) {
      geometryType = "LineString";
      coordinatesStr = geometryStr.replace("LINESTRING (", "").replace(")", "");
    } else if (geometryStr.startsWith("POLYGON")) {
      geometryType = "Polygon";
      coordinatesStr = geometryStr.replace("POLYGON ((", "").replace("))", "");
    } else if (geometryStr.startsWith("POINT")) {
      geometryType = "Point";
      coordinatesStr = geometryStr.replace("POINT (", "").replace(")", "");
    } else {
      throw new Error("Unsupported geometry type");
    }

    if (geometryStr.startsWith("LINESTRING")) {
      if (geometryType === "LineString" || geometryType === "Polygon") {
        const coordinatePairs = coordinatesStr.split(/,\s*/);

        coordinates = coordinatePairs.map((pair) => {
          const [longitude, latitude] = pair.split(/\s+/).map(Number);
          return [longitude, latitude];
        });

        // Wrap polygon coordinates in another array for the outer ring
        if (geometryType === "Polygon") {
          coordinates = [coordinates];
        }
      } else if (geometryType === "Point") {
        const [longitude, latitude] = coordinatesStr.split(/\s+/).map(Number);
        coordinates = [longitude, latitude];
      }
    }
    return coordinates;
  }
};


export const calculateCenter = (coordinates) => {
  const totalCoords = coordinates.length;
  const sumCoords = coordinates.reduce(
    (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]],
    [0, 0]
  );
  return [sumCoords[0] / totalCoords, sumCoords[1] / totalCoords];
}