/*
  # Add Unique Constraint to Storage Path

  1. Changes
    - Add unique constraint to storage_path column
    - This allows upsert operations in the upload script

  2. Notes
    - Each storage path should be unique
*/

-- Add unique constraint to storage_path
ALTER TABLE website_images
ADD CONSTRAINT website_images_storage_path_unique UNIQUE (storage_path);