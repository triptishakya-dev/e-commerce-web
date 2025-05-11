"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function ProductForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    discountPrice: "",
    colour: "",
    material: "",
    category: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/AddCategory");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        console.log(data);
        setCategories(data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: "" });
    setPreviewImage(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    console.log("Submitting form with data:", formData);
  
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
  
      console.log("FormData ready for submission:", [...data.entries()]);
  
      const response = await fetch("/api/AddProduct", {
        method: "POST",
        body: data,
      });
  
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
  
      const resData = await response.json();
      console.log("Product added successfully:", resData);
  
      setSuccess(true);
      setLoading(false);
  
      setTimeout(() => {
        setFormData({
          name: "",
          description: "",
          image: "",
          price: "",
          discountPrice: "",
          colour: "",
          material: "",
          category: "",
        });
        setPreviewImage(null);
        setSuccess(false);
        setStep(1);
      }, 3000);
    } catch (err) {
      console.error("Error submitting product:", err);
      setError(err.message);
      setLoading(false);
    }
  };
  

  const goToNextStep = () => {
    if (
      formData.name &&
      formData.description &&
      formData.category &&
      formData.image
    ) {
      setStep(2);
    } else {
      setError("Please fill in all required fields in Step 1");
    }
  };

  const goToPrevStep = () => {
    setStep(1);
    setError("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <Card className="shadow-lg border-t-4 border-t-blue-500">
        <CardHeader className="bg-slate-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-slate-800">
            Add New Product
          </CardTitle>
          <CardDescription>
            Complete the form to add a new product to your inventory
          </CardDescription>

          <div className="mt-4">
            <Progress value={step === 1 ? 50 : 100} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-slate-500">
              <span
                className={
                  step === 1 ? "font-medium text-blue-600" : "font-medium"
                }
              >
                Basic Details
              </span>
              <span
                className={
                  step === 2 ? "font-medium text-blue-600" : "font-medium"
                }
              >
                Specifications
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Product added successfully.
              </AlertDescription>
            </Alert>
          )}

          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category*</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem
                          key={category._id}
                          value={category._id}
                          className={"bg-gray-100"}
                        >
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>
                        Loading categories...
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  className="min-h-32 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label>Product Image*</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  {previewImage ? (
                    <div className="space-y-4">
                      <div className="relative w-40 h-40 mx-auto">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-contain rounded"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-100 rounded-full p-1 hover:bg-red-200"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-500">
                        Drag & drop an image or
                        <label className="ml-1 text-blue-600 hover:text-blue-800 cursor-pointer">
                          browse
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)*</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountPrice">Discount Price ($)*</Label>
                  <Input
                    id="discountPrice"
                    name="discountPrice"
                    type="number"
                    step="0.01"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="colour">Color*</Label>
                  <Input
                    id="colour"
                    name="colour"
                    value={formData.colour}
                    onChange={handleChange}
                    placeholder="e.g. Red, Blue, etc."
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material">Material*</Label>
                  <Input
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    placeholder="e.g. Cotton, Wood, etc."
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t p-6 bg-slate-50">
          {step === 1 ? (
            <div className="w-full">
              <Button
                type="button"
                onClick={goToNextStep}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex w-full justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={goToPrevStep}
                className="w-1/3"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              <Button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="w-2/3 bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>Submit Product</>
                )}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
