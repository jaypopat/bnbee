import React, {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Bell, Check, Eye, Lock, Pencil, User, X} from "lucide-react";
import MainLayout from "@/components/MainLayout";
import {useToast} from "@/hooks/use-toast";
import useAuth from "@/context/AuthProvider";
import api from "@/api";

interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    guestRating: number | null;
    ownerRating: number | null;
    role: "user" | "admin";
}



async function updateUser(userId: number, data: UserProfile) {
    try {
        const response = await api.put(`/api/users/${userId}`, data);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error updating user:', error.response?.status, error.response?.data);
        throw error;
    }
}

export default function AccountSettings() {
    const [activeSection, setActiveSection] = useState("Personal details");
    const [editMode, setEditMode] = useState<string | null>(null);

    type EditableFields = {[key: string]: string};
    const [editableFields, setEditableFields] = useState<EditableFields>({});

    const {user} = useAuth() as { user: UserProfile };
    const {toast} = useToast();

    const handleEdit = (field: string) => {
        setEditMode(field);
        setEditableFields(prev => ({
            ...prev,
            [field]: user[field as keyof UserProfile]?.toString() || ''
        }));
    };

    const handleSave = async (field: string) => {
        try {
            const data = {
                ...user,
                [field]: editableFields[field as keyof UserProfile]
            };
            console.log(data);
            await updateUser(user.id, data);

            setEditMode(null);
            toast({
                title: "Success",
                description: `${field} updated successfully`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update field",
                variant: "destructive",
            });
            console.error(error);
        }
    };

    const handleCancel = () => {
        setEditMode(null);
        setEditableFields({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditableFields(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const renderField = (label: string, field: keyof UserProfile) => (
        <div key={field}>
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

    const renderEditableField = (field: keyof UserProfile) => (
        <>
            <Input
                id={field}
                name={field}
                value={editableFields[field] || ''}
                onChange={handleChange}
                className="mr-2"
            />
            <Button variant="ghost" size="icon" onClick={() => handleSave(field)}>
                <Check className="h-4 w-4"/>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4"/>
            </Button>
        </>
    );

    const renderReadOnlyField = (field: keyof UserProfile) => (
        <>
            <Input
                id={field}
                value={user[field]?.toString() || ''}
                readOnly
                className="mr-2"
            />
            <Button variant="ghost" size="icon" onClick={() => handleEdit(field)}>
                <Pencil className="h-4 w-4"/>
            </Button>
        </>
    );

    const navItems = [
        {name: "Personal details", icon: User},
        {name: "Login & Security", icon: Lock},
        {name: "Privacy & Sharing", icon: Eye},
        {name: "Notifications", icon: Bell},
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

interface SidebarProps {
    navItems: Array<{
        name: string;
        icon: React.FC;
    }>;
    activeSection: string;
    setActiveSection: (section: string) => void;
}


const Sidebar: React.FC<SidebarProps> = ({navItems, activeSection, setActiveSection}) => (
    <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r">
        <nav className="flex flex-col">
            {navItems.map((item) => (
                <Button
                    key={item.name}
                    variant={activeSection === item.name ? "secondary" : "ghost"}
                    className="justify-start rounded-none h-14"
                    onClick={() => setActiveSection(item.name)}
                >
                    <item.icon className="mr-2 h-4 w-4"/>
                    {item.name}
                </Button>
            ))}
        </nav>
    </div>
);

interface ContentProps {
    activeSection: string;
    user: UserProfile;
    renderField: (label: string, field: keyof UserProfile) => JSX.Element;
    handleEdit: (field: string) => void;
}

const Content: React.FC<ContentProps> = ({activeSection, user, renderField, handleEdit}) => (
    <div className="w-full md:w-2/3 p-6">
        <h2 className="text-2xl font-semibold mb-6">{activeSection}</h2>
        {activeSection === "Personal details" ? (
            <>
                <UserProfile user={user} handleEdit={handleEdit}/>
                <div className="space-y-4">
                    {renderField("First Name", "firstName")}
                    {renderField("Last Name", "lastName")}
                    {renderField("Email Address", "email")}

                </div>
            </>
        ) : (
            <p>Content for {activeSection} goes here.</p>
        )}
    </div>
);

interface UserProfileProps {
    user: UserProfile;
    handleEdit: (field: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({user, handleEdit}) => (
    <div className="flex items-center mb-6">
        <Avatar className="h-20 w-20 mr-4">
            <AvatarImage src="/placeholder.svg" alt={`${user.firstName} ${user.lastName}`}/>
            <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
        </Avatar>
        <div>
            <h3 className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => handleEdit('firstName')}>
            <Pencil className="h-4 w-4"/>
        </Button>
    </div>
);