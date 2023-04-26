export interface Entry {
  id?: string;
  title: string;
  description: string;
  created_at: Date | string;
}
export type EntryContextType = {
  entries: Entry[];
  saveEntry: (entry: Entry) => void;
  updateEntry: (id: string, entryData: Entry) => void;
  deleteEntry: (id: string) => void;
};

export type Modal = {
  hideModal: () => void,
  showModal: () => void,
  visibility: boolean,
}