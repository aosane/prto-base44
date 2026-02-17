import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const mockLeads = [
  { id: 1, name: 'Marie Dubois', title: 'VP Sales', company: 'TechCorp', location: 'Paris, France', email: 'Available', phone: 'Available' },
  { id: 2, name: 'Jean Martin', title: 'CEO', company: 'Startup Inc', location: 'Lyon, France', email: 'Available', phone: 'Available' },
  { id: 3, name: 'Sophie Bernard', title: 'Head of Marketing', company: 'Digital Solutions', location: 'Marseille, France', email: 'Available', phone: 'Available' },
  { id: 4, name: 'Pierre Petit', title: 'CTO', company: 'InnovateNow', location: 'Toulouse, France', email: 'Available', phone: 'Available' },
  { id: 5, name: 'Camille Roux', title: 'Sales Director', company: 'CloudTech', location: 'Bordeaux, France', email: 'Available', phone: 'Available' },
  { id: 6, name: 'Lucas Moreau', title: 'Product Manager', company: 'SaaS Company', location: 'Nantes, France', email: 'Available', phone: 'Available' },
  { id: 7, name: 'Emma Laurent', title: 'COO', company: 'Enterprise Co', location: 'Strasbourg, France', email: 'Available', phone: 'Available' },
  { id: 8, name: 'Thomas Simon', title: 'VP Marketing', company: 'Growth Inc', location: 'Nice, France', email: 'Available', phone: 'Available' },
  { id: 9, name: 'Julie Blanc', title: 'Head of Sales', company: 'B2B Solutions', location: 'Lille, France', email: 'Available', phone: 'Available' },
  { id: 10, name: 'Alexandre Fournier', title: 'Founder', company: 'TechStart', location: 'Rennes, France', email: 'Available', phone: 'Available' },
];

export default function LeadsTable() {
  const [selectedIds, setSelectedIds] = useState([]);
  const allSelected = selectedIds.length === mockLeads.length;

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : mockLeads.map(l => l.id));
  };

  const toggleOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 w-10">
              <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
          </tr>
        </thead>
        <tbody>
          {mockLeads.map((lead) => (
            <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <Checkbox
                  checked={selectedIds.includes(lead.id)}
                  onCheckedChange={() => toggleOne(lead.id)}
                />
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">{lead.title}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{lead.company}</td>
              <td className="py-3 px-4 text-sm text-gray-500">{lead.location}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}