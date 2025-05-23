import { useSessionName, useTelemetryValue } from '@irdashies/context';
import { formatTimeShort } from '@irdashies/utils/time';
import { useDriverIncidents, useSessionLapCount } from '../hooks';

export const SessionBar = () => {
  const sessionNum = useTelemetryValue('SessionNum');
  const sessionName = useSessionName(sessionNum);
  const { incidentLimit, incidents } = useDriverIncidents();
  const { total, current, timeElapsed, timeRemaining } = useSessionLapCount();
  return (
    <div className="bg-slate-900/70 text-sm px-3 py-1 flex justify-between">
      <div className="flex flex-1 grow">{sessionName}</div>
      {current > 0 && (
        <div className="flex flex-1 grow justify-center">
          L {current} {total ? ` / ${total}` : ''}
        </div>
      )}
      {timeRemaining <= 86400 && ( // 86400 seconds = 24 hours
        <div className="flex flex-1 grow justify-center">
          {(() => {
            const elapsed = formatTimeShort(timeElapsed);
            const remaining = formatTimeShort(timeRemaining, true);
            return elapsed ? `${elapsed} / ${remaining} m` : `${remaining} m`;
          })()}
        </div>
      )}
      <div className="flex flex-1 grow justify-end">
        {incidents}
        {incidentLimit ? ' / ' + incidentLimit : ''} x
      </div>
    </div>
  );
};
