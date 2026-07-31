async function testConnection() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*");

  if (error) {
    console.error("❌ Error:", error);
  } else {
    console.log("✅ Connected!");
    console.log(data);
  }
}

testConnection();