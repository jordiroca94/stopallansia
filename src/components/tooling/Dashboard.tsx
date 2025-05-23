"use client";

import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import Loader from "../ui/Loader";
import { HiOutlineMail } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

type TicketPayment = {
  _id: string;
  name: string;
  email: string;
  description: string;
  amount: number;
  paymentID: string;
  last4Digits: string;
  locale: "en" | "es" | "it";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [payments, setPayments] = useState<TicketPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const router = useRouter();
  const locale = useLocale();

  const handleLogout = () => {
    setLogoutLoading(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin");
      router.push(`/${locale}/admin`);
    }
  };

  const getPayments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPayments(data.payments);
        const totalPayments = data.payments.reduce(
          (accumulator: number, payment: TicketPayment) =>
            accumulator + payment.amount,
          0
        );

        setTotalAmountPaid(totalPayments / 100);
        console.log("Payments fetched successfully:", data.payments);
        setLoading(false);
      }
      if (!res.ok) {
        console.error("Error fetching payments:", data);
      }
    } catch (err) {
      console.error("❌ Error getting payment:", err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem("admin");
      if (isAdmin !== "true") {
        router.push(`/${locale}/admin`);
      }
    }
    getPayments();
  }, []);

  // Resend email

  const handleSendEmail = async (payment: TicketPayment) => {
    setSendingEmailId(payment._id);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Email failed:", data.error);
      }
    } catch (err) {
      console.error("Error sending email:", err);
    }

    setSendingEmailId(null);
  };

  // Filter payments based on search term
  const filteredPayments = payments.filter((payment) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      payment.name?.toLowerCase().includes(searchLower) ||
      payment.email?.toLowerCase().includes(searchLower) ||
      payment.description?.toLowerCase().includes(searchLower) ||
      payment.paymentID?.toLowerCase().includes(searchLower)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredPayments.length);
  const currentItems = filteredPayments.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle page changes
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const isAdmin = localStorage.getItem("admin");

  if (isAdmin !== "true") return;

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-red to-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex ">
          <div className="w-full px-2 sm:px-10">
            <h1 className="text-2xl font-bold text-white">
              Stop All Ansia Dashboard
            </h1>
            <p className="mt-1 text-white/80">
              Manage and track all ticket payments
            </p>
            <p className="mt-1 text-white/80">
              Total payments: {totalAmountPaid.toLocaleString("es-ES")} €
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="hidden mt-4 sm:inline-block bg-red/70 hover:bg-white text-white hover:text-red/70 hover:border-red/70 hover:border font-semibold px-6 py-3 rounded hover:bg-gray-100 transition whitespace-nowrap h-min"
          >
            {logoutLoading ? <Loader className="h-5 w-5" /> : "Logout"}
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-6 text-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={handleLogout}
            className="sm:hidden inline-block bg-red/70 hover:bg-white hover:text-red/70 hover:border-red/70 hover:border font-semibold px-4 py-2 rounded hover:bg-gray-100 transition whitespace-nowrap"
          >
            {logoutLoading ? <Loader className="h-5 w-5" /> : "Logout"}
          </button>
          <div className="relative w-full sm:w-64 lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{filteredPayments.length}</span>
            <span className="ml-1">tickets found</span>
          </div>
        </div>

        {/* Payments table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Issue date
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    <Loader className="mt-10" />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((payment) => {
                    const date = new Date(payment.createdAt);
                    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

                    return (
                      <tr key={payment.paymentID} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                          {payment.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.paymentID}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.amount / 100} €
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formattedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button onClick={() => handleSendEmail(payment)}>
                            {sendingEmailId === payment._id ? (
                              <Loader className="h-5 w-5" />
                            ) : (
                              <HiOutlineMail className="h-5 w-5 text-gray-400 hover:text-gray-600 hover:text-red" />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-sm text-gray-500 w-full"
                    >
                      No tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
        {/* Pagination */}
        {filteredPayments.length > itemsPerPage && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to <span className="font-medium">{endIndex}</span> of{" "}
                  <span className="font-medium">{filteredPayments.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <IoChevronBackOutline
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }).map(
                    (_, i) => {
                      // Logic to show pages around current page
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <IoChevronForward className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
