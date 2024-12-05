export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  // Ensure the time is in 2-digit format
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

export const validateTimeOrder = (startTime: string, endTime: string) => {
  const existingStartTime = new Date(`1970-01-01T${startTime}:00`);
  const existingEndTime = new Date(`1970-01-01T${endTime}:00`);

  if (existingStartTime >= existingEndTime) {
    return true;
  }
  return false;
};

export const timeDifferenceBetweenStartToEnd = (
  startTime: string,
  endTime: string,
) => {
  const [startHours, startMinutes] = startTime.split(":");
  const totalStartMinutes = parseInt(startHours) * 60 + parseInt(startMinutes);

  const [endHours, endMinutes] = endTime.split(":");
  const totalEndMinutes = parseInt(endHours) * 60 + parseInt(endMinutes);

  const timeDifference = totalEndMinutes - totalStartMinutes;
  return timeDifference;
};

export const getSlots = (
  startTime: string,
  duration: number,
  totalSlot: number,
  remainingData: Record<string, unknown>,
) => {
  const slots = [];
  let currentStartTime = startTime;
  for (let start = 1; start <= totalSlot; start++) {
    const [startHours, startMinutes] = currentStartTime.split(":");
    const totalStartMinutes =
      parseInt(startHours) * 60 + parseInt(startMinutes);
    const newEndTime = totalStartMinutes + duration;
    const hours = Math.floor(newEndTime / 60);
    const minutes = newEndTime % 60;
    const endTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    const newPayload: Record<string, unknown> = {
      ...remainingData,
      startTime: currentStartTime,
      endTime,
    };
    slots.push(newPayload);

    currentStartTime = endTime;
  }
  return slots;
};
