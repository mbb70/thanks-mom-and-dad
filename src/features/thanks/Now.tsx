import React from 'react';

/*
import { useAppSelector } from '../../app/hooks';
import {
  timeSelector,
  estCurrentTideSelector,
  prevTideSelector,
  nextTideSelector,
  tideEstimates,
} from './tidesSlice';

function cap(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function tideBgColor(height: number) {
  if (height < -2) {
    return 'bg-yellow-500';
  } else if (height < -1) {
    return 'bg-yellow-400';
  } else if (height < 0) {
    return 'bg-yellow-300';
  } else if (height < 1) {
    return 'bg-yellow-200';
  } else if (height < 2) {
    return 'bg-yellow-100';
  } else if (height < 3) {
    return 'bg-blue-100';
  } else if (height < 4) {
    return 'bg-blue-200';
  } else if (height < 5) {
    return 'bg-blue-300';
  } else {
    return 'bg-blue-400';
  }
}

function TideGraph() {
  const time = useAppSelector(timeSelector);
  const estimates = useAppSelector(tideEstimates);
  const estVs = estimates.map((est) => est.v);
  const estTs = estimates.map((est) => est.t);
  const maxEst = Math.max(...estVs);
  const minEst = Math.min(...estVs);
  const maxT = Math.max(...estTs);
  const minT = Math.min(...estTs);
  const zeroToOneEstimates = estimates.map((est) => {
    return { ...est, scaledT: (est.t - minT)/(maxT - minT), scaledV: (est.v - minEst)/(maxEst - minEst) };
  })
  const rescaledNow = (time - minT)/(maxT - minT);

  return (
    <div className="p-1 px-2 pt-2 flex-grow">
      <div className="h-20 relative">
        <div className={`w-0.5 h-full rounded-full opacity-60 bg-red-400 absolute`} style={{ left: `${100 * rescaledNow}%` }}></div>
        {zeroToOneEstimates.map((est, i) => {
          const display = i % 2 === 0 ? 'hidden sm:inline' : '';
          return (
            <span key={i} className={`${display} w-1 h-1 rounded ${tideBgColor(est.v)} absolute`} style={{ bottom: `${100 * est.scaledV}%`, left: `${100 * est.scaledT}%` }}></span>
          );
        })}
      </div>
    </div>
  );
}

function CurrentTideHeight() {
  const estCurrentTide = useAppSelector(estCurrentTideSelector);
  return (
    <div className="flex flex-col justify-center">
      <span className="text-7xl text-blue-200">{estCurrentTide.toFixed(1)} ft</span>
    </div>
  );
}

function CurrentTideDescription() {
  const estCurrentTide = useAppSelector(estCurrentTideSelector);
  const time = useAppSelector(timeSelector);

  const prevTide = useAppSelector(prevTideSelector);
  const nextTide = useAppSelector(nextTideSelector);

  const sincePrevTide = time - prevTide.t;
  const tillNextTide = nextTide.t - time;
  const closestTide = sincePrevTide > tillNextTide ? nextTide : prevTide;
  const timeToClosest = time - closestTide.t;

  let description = '';

  const closestTideName = closestTide.type === 'H' ? 'high' : 'low';
  const absMinutestToClosest = Math.round(Math.abs(timeToClosest) / 1000 / 60);
  let s = absMinutestToClosest === 1 ? '' : 's';
  const awayAgo = timeToClosest < 0 ? 'away' : 'ago';
  const pastBefore = timeToClosest < 0 ? 'before' : 'past';
  if (absMinutestToClosest < 15) {
    description = `Just ${pastBefore} ${closestTideName} tide (${absMinutestToClosest} minute${s} ${awayAgo})`
  } else if (absMinutestToClosest < 60) {
    description = `${cap(pastBefore)} ${closestTideName} tide (${absMinutestToClosest} minute${s} ${awayAgo})`
  } else {
    const absHoursToClosest = Math.round(absMinutestToClosest / 60);
    s = absHoursToClosest === 1 ? '' : 's';
    const wasIs = timeToClosest < 0 ? 'is' : 'was';
    const comingGoing = nextTide.type === 'L' ? 'going out' : 'coming in'
    description = `Tide is ${comingGoing} (${closestTideName} ${wasIs} ${absHoursToClosest} hour${s} ${awayAgo})`
  }

  const bgColor = tideBgColor(estCurrentTide);
  return (
    <div className="flex mt-2">
      <div className={`text-xl text-center py-2 px-3 rounded-xl w-full ${bgColor}`}>
        <span>{description}</span>
      </div>
    </div>
  );
}

export function Now() {
  return (
    <div className="px-4 py-2 bg-gray-600 top-0 sticky">
      <div className="mb-4 flex">
        <CurrentTideHeight />
        <TideGraph />
      </div>
      <CurrentTideDescription />
    </div>
  );
}
*/