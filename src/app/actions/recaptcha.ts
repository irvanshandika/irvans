"use server";

/**
 * Verifikasi token reCAPTCHA dengan Google reCAPTCHA API
 * @param token Token reCAPTCHA yang diterima dari client
 * @returns Object yang berisi status keberhasilan dan skor
 */
export async function verifyReCaptcha(token: string) {
  try {
    // Ambil secret key dari environment variable
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY tidak ditemukan di environment variables");
      return { success: false, score: 0 };
    }

    // Kirim request ke Google reCAPTCHA API untuk verifikasi token
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = await response.json();

    // Periksa hasil verifikasi
    if (data.success) {
      // Skor reCAPTCHA v3 berkisar dari 0.0 hingga 1.0
      // Semakin tinggi skor, semakin besar kemungkinan interaksi dilakukan oleh manusia
      return { success: true, score: data.score };
    } else {
      console.error("reCAPTCHA verification failed:", data["error-codes"]);
      return { success: false, score: 0 };
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return { success: false, score: 0 };
  }
}