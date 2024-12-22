import styled from "@emotion/styled"
import { getImgUrl } from "../../helpers/image"

const Img = styled.img`
    max-width: 150px;
`

export const ImageTag = ({ src, alt = "" }: { src: string; alt?: string }) => {
  return <Img src={getImgUrl(src)} alt={alt} />
}
