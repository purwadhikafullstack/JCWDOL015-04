export interface PaymentTransaction {
    transaction_id: number; // ID unik transaksi
    user_id: number; // ID pengguna yang melakukan transaksi
    amount: string; // Jumlah pembayaran (dalam format string)
    transaction_date: string; // Tanggal transaksi
    status: 'pending' | 'completed' | 'failed'; // Status transaksi
    payment_method: 'bank_transfer' | 'credit_card' | 'e-wallet' | null; // Metode pembayaran
    receipt: string | null; // Bukti pembayaran (jika ada)
    created_at: string; // Waktu pembuatan transaksi
    updated_at: string; // Waktu terakhir pembaruan transaksi
    subscription_id: number | null; // ID subscription terkait (jika ada)
    subscription_type_id: number; // ID tipe subscription
  }
  
  export interface SubscriptionType {
    subs_type_id: number; // ID tipe subscription
    type: string; // Nama tipe subscription (contoh: STANDARD)
    description: string; // Deskripsi subscription
    price: string; // Harga subscription dalam format string
    features: string[]; // Daftar fitur yang termasuk dalam subscription
    is_recomend: boolean; // Apakah subscription direkomendasikan
    User_id: number; // ID pengguna yang membuat subscription tipe (opsional)
  }
  
  export interface SubscriptionActive {
    subscription_id: number; // ID subscription
    start_date: string; // Tanggal mulai subscription (ISO string)
    end_date: string; // Tanggal akhir subscription (ISO string)
    status: 'active' | 'expired'; // Status subscription
    payment_proof: boolean; // Apakah bukti pembayaran sudah ada
    created_at: string; // Tanggal subscription dibuat (ISO string)
    updated_at: string; // Tanggal subscription terakhir diperbarui (ISO string)
    amount: string; // Nominal pembayaran untuk subscription
    user_id: number; // ID pengguna
    subscription_type_id: number; // ID tipe subscription
    subscriptionType: SubscriptionType; // Detail tipe subscription
  }
  

  export interface PaymentTransactionRespon {
    dataAll: PaymentTransaction[];
    status: string;
  }
  export interface SubscriptionActiveRespon {
    dataAll: SubscriptionActive[];
    status: string;
  }