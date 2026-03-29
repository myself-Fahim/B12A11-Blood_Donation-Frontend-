import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loader from '../Component/Loader';

// ── Icon components ──────────────────────────────────────────────────────────
const BlockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
);
const UnblockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
    </svg>
);
const VolunteerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const AdminIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

// ── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const isActive = status === 'active';
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
            letterSpacing: '0.03em',
            background: isActive ? '#dcfce7' : '#fee2e2',
            color: isActive ? '#15803d' : '#b91c1c',
            border: `1px solid ${isActive ? '#86efac' : '#fca5a5'}`,
        }}>
            <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: isActive ? '#22c55e' : '#ef4444',
                display: 'inline-block',
            }} />
            {status}
        </span>
    );
};

// ── Role badge ───────────────────────────────────────────────────────────────
const RoleBadge = ({ role }) => {
    const colors = {
        admin:     { bg: '#ede9fe', color: '#6d28d9', border: '#c4b5fd' },
        volunteer: { bg: '#dbeafe', color: '#1d4ed8', border: '#93c5fd' },
        user:      { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' },
    };
    const c = colors[role] || colors.user;
    return (
        <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: 20,
            fontSize: 12, fontWeight: 600, letterSpacing: '0.03em',
            background: c.bg, color: c.color, border: `1px solid ${c.border}`,
        }}>
            {role}
        </span>
    );
};

// ── Main component ────────────────────────────────────────────────────────────
const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const [totalUser, setTotalUser]       = useState(null);
    const [filterUser, setFilterUser]     = useState(null);
    const [loading, setLoading]           = useState(true);
    const [search, setSearch]             = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        axiosSecure('/users')
            .then(res => { setTotalUser(res.data || []); setFilterUser(res.data || []); })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [axiosSecure]);

    const applyFilters = (users, searchVal, statusVal) => {
        let result = users;
        if (statusVal !== 'All') result = result.filter(u => u.status === statusVal);
        if (searchVal.trim()) {
            const q = searchVal.toLowerCase();
            result = result.filter(u =>
                u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
            );
        }
        return result;
    };

    const handleSearch = (val) => {
        setSearch(val);
        setFilterUser(applyFilters(totalUser, val, statusFilter));
    };

    const handleStatus = (val) => {
        setStatusFilter(val);
        setFilterUser(applyFilters(totalUser, search, val));
    };

    const patchUser = (id, patch, rollback) => {
        setFilterUser(prev => prev.map(u => u._id === id ? { ...u, ...patch } : u));
        setTotalUser(prev => prev.map(u => u._id === id ? { ...u, ...patch } : u));
        const user = filterUser.find(u => u._id === id);
        axiosSecure.put(`/user/id/${id}`, { ...user, ...patch }).catch(err => {
            console.log(err);
            setFilterUser(prev => prev.map(u => u._id === id ? { ...u, ...rollback } : u));
            setTotalUser(prev => prev.map(u => u._id === id ? { ...u, ...rollback } : u));
        });
    };

    const handleBlock   = id => patchUser(id, { status: 'block'  }, { status: 'active' });
    const handleUnblock = id => patchUser(id, { status: 'active' }, { status: 'block'  });
    const makeVolunteer = id => { const u = filterUser.find(x => x._id === id); patchUser(id, { role: 'volunteer' }, { role: u.role }); };
    const makeAdmin     = id => { const u = filterUser.find(x => x._id === id); patchUser(id, { role: 'admin'     }, { role: u.role }); };

    const totalCount   = totalUser?.length ?? 0;
    const activeCount  = totalUser?.filter(u => u.status === 'active').length ?? 0;
    const blockedCount = totalUser?.filter(u => u.status === 'block').length ?? 0;

    return (
        <div style={{ padding: '32px 40px', fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', background: '#f8fafc' }}>

            {/* ── Page header ── */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: 10, background: '#6366f1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    }}>
                        <UsersIcon />
                    </div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>User Management</h1>
                </div>
                <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
                    Manage roles, access and status for all registered users.
                </p>
            </div>

            {/* ── Stat cards ── */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
                {[
                    { label: 'Total Users', value: totalCount,   color: '#6366f1', bg: '#eef2ff' },
                    { label: 'Active',      value: activeCount,  color: '#16a34a', bg: '#dcfce7' },
                    { label: 'Blocked',     value: blockedCount, color: '#dc2626', bg: '#fee2e2' },
                ].map(({ label, value, color, bg }) => (
                    <div key={label} style={{
                        flex: '1 1 140px', minWidth: 140,
                        background: '#fff', border: '1px solid #e2e8f0',
                        borderRadius: 12, padding: '16px 20px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}>
                        <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
                        <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{label}</div>
                        <div style={{ marginTop: 10, height: 4, borderRadius: 4, background: bg }}>
                            <div style={{
                                height: '100%', borderRadius: 4, background: color,
                                width: totalCount ? `${(value / totalCount) * 100}%` : '0%',
                                transition: 'width 0.6s ease',
                            }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Toolbar ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                {/* Search */}
                <div style={{ position: 'relative', flex: '1 1 280px', minWidth: 220 }}>
                    <span style={{
                        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                        color: '#94a3b8', display: 'flex', pointerEvents: 'none',
                    }}>
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by name or email…"
                        value={search}
                        onChange={e => handleSearch(e.target.value)}
                        style={{
                            width: '100%', padding: '10px 14px 10px 40px',
                            border: '1.5px solid #e2e8f0', borderRadius: 10,
                            fontSize: 14, color: '#0f172a', background: '#fff',
                            outline: 'none', boxSizing: 'border-box',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)';
                        }}
                    />
                </div>

                {/* Status filter */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                        position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                        color: '#94a3b8', pointerEvents: 'none', display: 'flex',
                    }}>
                        <FilterIcon />
                    </span>
                    <select
                        value={statusFilter}
                        onChange={e => handleStatus(e.target.value)}
                        style={{
                            appearance: 'none', padding: '10px 36px 10px 34px',
                            border: '1.5px solid #e2e8f0', borderRadius: 10,
                            fontSize: 14, color: '#0f172a', background: '#fff',
                            outline: 'none', cursor: 'pointer', minWidth: 150,
                            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        }}
                    >
                        <option value="All">All Status</option>
                        <option value="active">Active</option>
                        <option value="block">Blocked</option>
                    </select>
                    <span style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                        pointerEvents: 'none', color: '#94a3b8', fontSize: 12,
                    }}>▾</span>
                </div>

                {/* Result count */}
                <span style={{ fontSize: 13, color: '#94a3b8', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                    {filterUser ? `${filterUser.length} user${filterUser.length !== 1 ? 's' : ''}` : ''}
                </span>
            </div>

            {/* ── Table ── */}
            {filterUser == null ? (
                <Loader />
            ) : filterUser.length === 0 ? (
                <div style={{
                    textAlign: 'center', padding: '64px 0', color: '#94a3b8',
                    background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0',
                }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#64748b' }}>No users found</div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your search or filter.</div>
                </div>
            ) : (
                <div style={{
                    background: '#fff', borderRadius: 16,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                                {['User', 'Email', 'Role', 'Status', 'Actions'].map(h => (
                                    <th key={h} style={{
                                        padding: '13px 20px', textAlign: 'left',
                                        fontSize: 11, fontWeight: 700, color: '#94a3b8',
                                        letterSpacing: '0.07em', textTransform: 'uppercase',
                                        whiteSpace: 'nowrap',
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filterUser.map((userr, idx) => (
                                <tr
                                    key={userr._id}
                                    style={{ borderBottom: idx < filterUser.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    {/* User */}
                                    <td style={{ padding: '14px 20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 10, overflow: 'hidden',
                                                border: '2px solid #e2e8f0', flexShrink: 0, background: '#f1f5f9',
                                            }}>
                                                <img src={userr.photoUrl} alt={userr.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={e => { e.target.style.display = 'none'; }}
                                                />
                                            </div>
                                            <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>
                                                {userr.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748b' }}>
                                        {userr.email}
                                    </td>

                                    {/* Role */}
                                    <td style={{ padding: '14px 20px' }}>
                                        <RoleBadge role={userr.role} />
                                    </td>

                                    {/* Status */}
                                    <td style={{ padding: '14px 20px' }}>
                                        <StatusBadge status={userr.status} />
                                    </td>

                                    {/* Actions — unchanged DaisyUI icon buttons */}
                                    <td style={{ padding: '14px 20px' }}>
                                        <div className="flex items-center gap-2">
                                            <div className="tooltip tooltip-top" data-tip="Block User">
                                                <button onClick={() => handleBlock(userr._id)}
                                                    className="btn btn-sm btn-error btn-outline p-2" aria-label="Block user">
                                                    <BlockIcon />
                                                </button>
                                            </div>
                                            <div className="tooltip tooltip-top" data-tip="Unblock User">
                                                <button onClick={() => handleUnblock(userr._id)}
                                                    className="btn btn-sm btn-success btn-outline p-2" aria-label="Unblock user">
                                                    <UnblockIcon />
                                                </button>
                                            </div>
                                            <div className="tooltip tooltip-top" data-tip="Make Volunteer">
                                                <button onClick={() => makeVolunteer(userr._id)}
                                                    className="btn btn-sm btn-primary btn-outline p-2" aria-label="Make volunteer">
                                                    <VolunteerIcon />
                                                </button>
                                            </div>
                                            <div className="tooltip tooltip-top" data-tip="Make Admin">
                                                <button onClick={() => makeAdmin(userr._id)}
                                                    className="btn btn-sm btn-neutral btn-outline p-2" aria-label="Make admin">
                                                    <AdminIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllUser;