export interface TeamMember {
  id: string;
  name: string;
  role: string;
  role_el: string;
  email: string;
  image: string;
}

export const defaultTeamMembers: TeamMember[] = [
  { id: '1', name: 'Katerina Parmagou', role: 'Architect N.T.U.A.', role_el: 'Αρχιτέκτων Ε.Μ.Π.', email: 'kp@mdterra.gr', image: '/images/team/Katerina-Parmagou-1-640x800.jpg' },
  { id: '2', name: 'Errikos Stefanos Piroula Godoy', role: 'Architect N.T.U.A.', role_el: 'Αρχιτέκτων Ε.Μ.Π.', email: 'ep@mdterra.gr', image: '/images/team/Errikos-Stefanos-Piroula-Godoy-640x800.jpg' },
  { id: '3', name: 'Eleftheria-Maria Kostopoulou', role: 'Architect N.T.U.A.', role_el: 'Αρχιτέκτων Ε.Μ.Π.', email: 'emk@mdterra.gr', image: '/images/team/Eleftheria-Maria-Kostopoulou-640x800.jpg' },
  { id: '4', name: 'Marisofi Loutragoti', role: 'Architect N.T.U.A.', role_el: 'Αρχιτέκτων Ε.Μ.Π.', email: 'msl@mdterra.gr', image: '/images/team/Marisofi-Loutragoti-1-640x800.jpg' },
  { id: '5', name: 'Maria Chaloutsi', role: 'Architect N.T.U.A.', role_el: 'Αρχιτέκτων Ε.Μ.Π.', email: 'mc@mdterra.gr', image: '/images/team/Maria-Chaloutsi-1-640x800.jpg' },
  { id: '6', name: 'Anna Machairioti', role: 'Architect N.T.U.A.', role_el: 'Αρχιτέκτων Ε.Μ.Π.', email: 'am@mdterra.gr', image: '/images/team/Anna-Machairioti-640x800.jpg' },
  { id: '7', name: 'Danai Nikolopoulou Tsatsaroni', role: 'Photographer', role_el: 'Φωτογράφος', email: 'dnt@mdterra.gr', image: '/images/team/Danai-Nikolopoulou-Tsatsaroni-640x800.jpg' },
  { id: '8', name: 'Katya Koneva', role: 'Architectural Assistant', role_el: 'Βοηθός Αρχιτέκτονα', email: 'kk@mdterra.gr', image: '/images/team/Katya-Koneva-640x800.jpeg' },
  { id: '9', name: 'Rita Dimitroglou', role: 'Interior Architect', role_el: 'Αρχιτέκτων Εσωτερικών Χώρων', email: 'rd@mdterra.gr', image: '/images/team/Rita-Dimitroglou-640x800.jpeg' },
  { id: '10', name: 'Giorgos Perakis', role: 'Architectural Assistant', role_el: 'Βοηθός Αρχιτέκτονα', email: 'gp@mdterra.gr', image: '/images/team/Giorgos-Perakis-640x800.jpeg' },
  { id: '11', name: 'Dafni Tsintzeli', role: 'Junior Architect', role_el: 'Junior Αρχιτέκτων', email: 'dt@mdterra.gr', image: '/images/team/Dafni-Tsintzeli-640x800.jpeg' }
];
