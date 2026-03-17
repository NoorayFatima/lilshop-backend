import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const files = (req as any).files as {
  originalname: string
  mimetype: string
  buffer: Buffer
}[]
if (!files.length) {
  return res.status(400).json({ error: "No files uploaded" })
}

    const uploaded = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname}`

        const { error } = await supabase.storage
          .from(process.env.SUPABASE_BUCKET!)
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          })

        if (error) throw error

        const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${fileName}`

        return {
          url: publicUrl,
        }
      })
    )

    res.json({ files: uploaded })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Upload failed" })
  }
}