import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, User, Lock, Eye, Bell, Check, X } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  nationality: string;
  gender: string;
}

const sampleUser: User = {
  id: 1,
  firstName: "Joanna",
  lastName: "Burpy",
  email: "joanna.burpy@example.com",
  phoneNumber: "+353 123 456 7890",
  dateOfBirth: "1990-01-01",
  nationality: "Irish",
  gender: "Female"
};

export default function AccountSettings() {
  const [activeSection, setActiveSection] = useState("Personal details");
  const [editMode, setEditMode] = useState<string | null>(null);
  const [user, setUser] = useState<User>(sampleUser);

  const { toast } = useToast();

  const handleEdit = (field: string) => setEditMode(field);

  const handleSave = (field: string) => {
    setEditMode(null);
    // Make API call to update user details here
    toast({
      title: "Success",
      description: `${field} updated successfully`,
    });
  };

  const handleCancel = () => {
    setEditMode(null);
    setUser(sampleUser);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const renderField = (label: string, field: keyof User) => (
    <div>
      <Label htmlFor={field}>{label}</Label>
      <div className="flex items-center">
        {editMode === field ? (
          renderEditableField(field)
        ) : (
          renderReadOnlyField(field)
        )}
      </div>
    </div>
  );

  const renderEditableField = (field: keyof User) => (
    <>
      <Input
        id={field}
        name={field}
        value={user[field]}
        onChange={handleChange}
        className="mr-2"
      />
      <Button variant="ghost" size="icon" onClick={() => handleSave(field)}>
        <Check className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleCancel}>
        <X className="h-4 w-4" />
      </Button>
    </>
  );

  const renderReadOnlyField = (field: keyof User) => (
    <>
      <Input id={field} value={user[field]} readOnly className="mr-2" />
      <Button variant="ghost" size="icon" onClick={() => handleEdit(field)}>
        <Pencil className="h-4 w-4" />
      </Button>
    </>
  );

  const navItems = [
    { name: "Personal details", icon: User },
    { name: "Login & Security", icon: Lock },
    { name: "Privacy & Sharing", icon: Eye },
    { name: "Notifications", icon: Bell },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Account</h1>
        <Card>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <Sidebar
                navItems={navItems}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
              <Content
                activeSection={activeSection}
                user={user}
                renderField={renderField}
                handleEdit={handleEdit}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}


const Sidebar = ({ navItems, activeSection, setActiveSection }:{
  navItems: { name: string; icon: React.FC }[];
  activeSection: string;
  setActiveSection: (section: string) => void;

}) => (
  <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r">
    <nav className="flex flex-col">
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant={activeSection === item.name ? "secondary" : "ghost"}
          className="justify-start rounded-none h-14"
          onClick={() => setActiveSection(item.name)}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.name}
        </Button>
      ))}
    </nav>
  </div>
);

const Content = ({ activeSection, user, renderField, handleEdit }:{
  activeSection: string;
  user: User;
  renderField: (label: string, field: keyof User) => JSX.Element;
  handleEdit: (field: string) => void;
}) => (
  <div className="w-full md:w-2/3 p-6">
    <h2 className="text-2xl font-semibold mb-6">{activeSection}</h2>
    {activeSection === "Personal details" ? (
      <>
        <UserProfile user={user} handleEdit={handleEdit} />
        <div className="space-y-4">
          {renderField("First Name", "firstName")}
          {renderField("Last Name", "lastName")}
          {renderField("Email Address", "email")}
          {renderField("Phone Number", "phoneNumber")}
          {renderField("Date of Birth", "dateOfBirth")}
          {renderField("Nationality", "nationality")}
          {renderField("Gender", "gender")}
        </div>
      </>
    )
      // change this to an if and render fields for other sections
      : (
      <p>Content for {activeSection} goes here.</p>
    )}
  </div>
);

const UserProfile = ({ user, handleEdit }:{
  user: User;
  handleEdit: (field: string) => void;

}) => (
  <div className="flex items-center mb-6">
    <Avatar className="h-20 w-20 mr-4">
      <AvatarImage src="/placeholder.svg" alt={`${user.firstName} ${user.lastName}`} />
      <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
    </Avatar>
    <div>
      <h3 className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
      <p className="text-sm text-gray-500">Guest</p>
    </div>
    <Button variant="ghost" size="icon" className="ml-auto" onClick={() => handleEdit('firstName')}>
      <Pencil className="h-4 w-4" />
    </Button>
  </div>
);
