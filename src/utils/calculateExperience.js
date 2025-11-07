// import dayjs from "dayjs";

// /**
//  * Calculate total experience in years and months for a specific doctor.
//  * @param {Array} data - The full experience array
//  * @param {number} doctorId - The doctor's ID (dr)
//  * @returns {Object} { years, months, totalMonths }
//  */
// export function calculateDoctorExperience(data, doctorId) {
//   const doctorRecords = data.filter(item => item.dr === doctorId);

//   let totalMonths = 0;

//   doctorRecords.forEach(item => {
//     const from = dayjs(item.FromDate);
//     console.log("from", from);
//     const till = dayjs(item.TillDate);
//     console.log("till", till);
//     const diffMonths = till.diff(from, "month");
//     console.log("diffMonths", diffMonths);
//     totalMonths += diffMonths;
//     console.log("totalMonths", totalMonths);
//   });

//   const years = Math.floor(totalMonths / 12);
//   const months = totalMonths % 12;

//   return { dr: doctorId, years, months, totalMonths };
// }


// utils/experience.js
import dayjs from "dayjs";

/**
 * Calculate experience for one doctor by taking min(FromDate) and max(TillDate).
 * @param {Array} records - array of experience objects
 * @param {number|string} doctorId - the dr id to compute for
 * @param {Object} opts
 *   - nowIfNoTill: boolean (if true and no TillDate present, use today's date)
 * @returns {Object} { years, months, totalMonths, startDate, endDate }
 */
export function calculateExperienceByRange(records, doctorId, opts = { nowIfNoTill: true }) {
  const items = records?.filter(r => String(r.dr) === String(doctorId));
  if (!items?.length) {
    return { years: 0, months: 0, totalMonths: 0, startDate: null, endDate: null };
  }

  // Initialize minFrom and maxTill from first item
  let minFrom = dayjs(items[0].FromDate);
  let maxTill = items[0].TillDate ? dayjs(items[0].TillDate) : null;

  for (let i = 1; i < items.length; i++) {
    const it = items[i];
    const f = dayjs(it.FromDate);
    if (f.isBefore(minFrom)) minFrom = f;

    if (it.TillDate) {
      const t = dayjs(it.TillDate);
      if (!maxTill || t.isAfter(maxTill)) maxTill = t;
    }
  }

  if (!maxTill && opts.nowIfNoTill) {
    maxTill = dayjs();
  }

  // If end is before start -> zero experience
  if (!maxTill || maxTill.isBefore(minFrom)) {
    return { years: 0, months: 0, totalMonths: 0, startDate: minFrom.toISOString(), endDate: maxTill ? maxTill.toISOString() : null };
  }

  // total full months between minFrom and maxTill
  const totalMonths = maxTill.diff(minFrom, "month"); // full months
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return {
    dr: doctorId,
    years,
    months,
    totalMonths,
    startDate: minFrom.toISOString(),
    endDate: maxTill.toISOString()
  };
}

/**
 * Compute for all doctors in the records (returns array of { dr, years, months, ... })
 */
// export function getAllDoctorsExperience(records, opts = { nowIfNoTill: true }) {
//   const drSet = [...new Set(records.map(r => r.dr))];
//   return drSet.map(dr => {
//     const res = calculateExperienceByRange(records, dr, opts);
//     return { dr, ...res };
//   });
// }

