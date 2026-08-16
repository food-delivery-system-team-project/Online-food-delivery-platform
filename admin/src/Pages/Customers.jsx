import { useEffect, useMemo, useState } from "react";
import {
  Ban,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  deleteCustomer,
  getCustomers,
  toggleCustomerStatus,
  updateCustomer,
} from "../api";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);
  const filtered = useMemo(
    () =>
      customers.filter((customer) =>
        `${customer.name} ${customer.email} ${customer.phone}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [customers, query],
  );
  const handleToggle = async (customer) => {
    const updated = await toggleCustomerStatus(customer.id);
    setCustomers((items) =>
      items.map((item) => (item.id === updated.id ? updated : item)),
    );
  };
  const saveCustomer = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const saved = await updateCustomer(editing.id, editing);
      setCustomers((items) =>
        items.map((item) => (item.id === saved.id ? saved : item)),
      );
      setEditing(null);
      setNotice(`${saved.name}'s profile has been updated.`);
    } finally {
      setSaving(false);
    }
  };
  const confirmDelete = async () => {
    const customer = deleting;
    setSaving(true);
    try {
      await deleteCustomer(customer.id);
      setCustomers((items) => items.filter((item) => item.id !== customer.id));
      setDeleting(null);
      setNotice(`${customer.name} was removed from customers.`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
            Customer management
          </p>
          <h1 className="page-heading mt-1">Customers</h1>
          <p className="mt-1 text-sm text-ink-500">
            {customers.length} registered customers in your local workspace.
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email or phone..."
            className="input pl-10"
          />
        </div>
      </div>
      {notice && (
        <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={17} /> {notice}
          </span>
          <button onClick={() => setNotice("")} aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      )}
      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/60 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Orders</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={6} className="px-5 py-5">
                      <div className="h-7 animate-pulse rounded bg-ink-100" />
                    </td>
                  </tr>
                ))
              : filtered.map((customer) => (
                  <tr
                    key={customer.id}
                    className="table-row-hover border-b border-ink-100/60 last:border-0"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`}
                          alt={customer.name}
                          className="h-10 w-10 rounded-xl bg-primary-50"
                        />
                        <div>
                          <p className="font-bold text-ink-800">
                            {customer.name}
                          </p>
                          <p className="text-xs text-ink-500">{customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-ink-700">{customer.email}</p>
                      <p className="mt-0.5 text-xs text-ink-500">
                        {customer.phone}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-ink-700">
                      {customer.orders}
                    </td>
                    <td className="px-5 py-3.5 text-ink-500">
                      {customer.joined}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`badge ${customer.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditing({ ...customer })}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary-50 px-3 py-2 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleToggle(customer)}
                          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${customer.status === "Active" ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}
                        >
                          {customer.status === "Active" ? (
                            <Ban size={14} />
                          ) : (
                            <CheckCircle size={14} />
                          )}
                          {customer.status === "Active" ? "Block" : "Unblock"}
                        </button>
                        <button
                          onClick={() => setDeleting(customer)}
                          aria-label={`Delete ${customer.name}`}
                          className="grid h-8 w-8 place-items-center rounded-xl text-ink-500 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-ink-500">
            No customers match your search.
          </div>
        )}
      </div>
      {editing && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => !saving && setEditing(null)}
        >
          <form
            onSubmit={saveCustomer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-editor-title"
            className="editor-dialog"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="absolute right-4 top-4 rounded-xl p-2 text-ink-500 hover:bg-ink-100"
            >
              <X size={18} />
            </button>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-primary">
              Customer profile
            </p>
            <h2
              id="customer-editor-title"
              className="mt-2 font-display text-2xl font-extrabold"
            >
              Edit {editing.name}
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Keep the customer record accurate and up to date.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label>
                <span className="label">Full name</span>
                <input
                  value={editing.name}
                  onChange={(event) =>
                    setEditing({ ...editing, name: event.target.value })
                  }
                  required
                  className="input"
                />
              </label>
              <label>
                <span className="label">Phone number</span>
                <input
                  value={editing.phone}
                  onChange={(event) =>
                    setEditing({ ...editing, phone: event.target.value })
                  }
                  required
                  className="input"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="label">Email address</span>
                <input
                  type="email"
                  value={editing.email}
                  onChange={(event) =>
                    setEditing({ ...editing, email: event.target.value })
                  }
                  required
                  className="input"
                />
              </label>
              <label>
                <span className="label">Order count</span>
                <input
                  type="number"
                  min="0"
                  value={editing.orders}
                  onChange={(event) =>
                    setEditing({
                      ...editing,
                      orders: Number(event.target.value),
                    })
                  }
                  required
                  className="input"
                />
              </label>
              <label>
                <span className="label">Account status</span>
                <span className="relative block">
                  <select
                    value={editing.status}
                    onChange={(event) =>
                      setEditing({ ...editing, status: event.target.value })
                    }
                    className="select-enhanced input pr-9"
                  >
                    <option>Active</option>
                    <option>Blocked</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500"
                  />
                </span>
              </label>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving..." : "Save customer"}
              </button>
            </div>
          </form>
        </div>
      )}
      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.name || "customer"}?`}
        message={`This will permanently delete ${deleting?.name || "this customer"} and their saved profile from the admin workspace. This cannot be undone.`}
        loading={saving && Boolean(deleting)}
        onClose={() => !saving && setDeleting(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
