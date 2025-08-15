import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera, Plus } from "lucide-react";
import BottomNavigation from "@/components/bottom-navigation";
import { Link } from "wouter";

export default function Profile() {
  const [name, setName] = useState("Emma");
  const [age, setAge] = useState(26);
  const [bio, setBio] = useState("Just finished work, looking for good conversation over drinks 🍷");
  const [photos] = useState<string[]>([]);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center space-x-3">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full text-white"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="font-poppins font-semibold text-lg" data-testid="text-profile-title">
          Edit Profile
        </h1>
      </div>

      <div className="p-4 pb-24">
        {/* Photos Section */}
        <div className="mb-6">
          <h2 className="font-poppins font-semibold text-lg mb-3" data-testid="text-photos-title">
            Your Photos
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {photos.length === 0 && (
              <Button
                variant="outline"
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center"
                data-testid="button-add-photo"
              >
                <Camera className="w-6 h-6 text-gray-400 mb-1" />
                <span className="text-xs text-gray-400">Add Photo</span>
              </Button>
            )}
            {Array.from({ length: 5 }).map((_, index) => (
              <Button
                key={index}
                variant="outline"
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center"
                data-testid={`button-photo-${index}`}
              >
                <Plus className="w-6 h-6 text-gray-400" />
              </Button>
            ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className="mb-6">
          <h2 className="font-poppins font-semibold text-lg mb-3" data-testid="text-info-title">
            Basic Info
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" data-testid="label-name">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                data-testid="input-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" data-testid="label-age">
                Age
              </label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                placeholder="Enter your age"
                data-testid="input-age"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h2 className="font-poppins font-semibold text-lg mb-3" data-testid="text-bio-title">
            About You
          </h2>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell people about yourself..."
            className="min-h-[100px]"
            data-testid="textarea-bio"
          />
          <p className="text-xs text-gray-500 mt-1">
            {bio.length}/500 characters
          </p>
        </div>

        {/* Save Button */}
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold"
          data-testid="button-save-profile"
        >
          Save Changes
        </Button>
      </div>

      <BottomNavigation currentPage="profile" />
    </div>
  );
}
