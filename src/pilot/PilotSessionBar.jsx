import React from 'react';

export default function PilotSessionBar({ session, links, onSwitch }) {
  if (!session?.account) return null;

  const account = session.account;
  const relation = account.role === 'student'
    ? links?.school?.name
    : account.role === 'family'
      ? links?.student?.displayName
      : links?.classRooms?.[0]?.label || links?.school?.name;

  return (
    <div className="pilotSessionBar">
      <span>
        <b>{account.label}</b>
        <strong>{account.displayName}</strong>
        {relation && <small>{relation}</small>}
      </span>
      <button type="button" onClick={onSwitch}>Trocar perfil</button>
    </div>
  );
}
