
export interface Project {
  id: string;
  title: string;
  location: string;
  materials: string;
  imageUrl: string;
}

export interface ConfigState {
  propertyType: 'apartment' | 'house' | null;
  securityLevel: 'III' | 'III+' | 'IV+' | null;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}
